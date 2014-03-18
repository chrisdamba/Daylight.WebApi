using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Principal;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using System.Web.Security;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Core.Attributes
{
    /// <summary>
    /// Defines a filter which throws an <see cref="UnauthorizedAccessException"/> if the
    /// current user is not authorized. 
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class AuthorizeUserAttribute : AuthorizeAttribute
    {
        private readonly ISecurityFactory securityFactory;
        private enum AuthType { basic, cookie };

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthorizeUserAttribute"/> class.
        /// </summary>
        public AuthorizeUserAttribute()
            : this (Injector.Get<ISecurityFactory>())
        {
        }
        
        /// <summary>
        /// Initializes a new instance of the <see cref="AuthorizeUserAttribute"/> class.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        public AuthorizeUserAttribute(ISecurityFactory securityFactory)
        {
            this.securityFactory = securityFactory;
        }

        /// <summary>
        /// Called by the MVC framework before the action method executes.
        /// </summary>
        /// <param name="filterContext">The filter context.</param>
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var skipAuthorization = filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true)
            || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true);
            if (!skipAuthorization)
            {
                if (filterContext.HttpContext.User.Identity.IsAuthenticated && filterContext.Result is HttpUnauthorizedResult)
                {
                    throw new UnauthorizedAccessException("Access denied");
                }

                string username;

                if (Authenticate(filterContext, out username))
                {
                    var user = securityFactory.GetUser(username);
                    if (user == null)
                    {
                        throw new UnauthorizedAccessException("Access denied");
                    }
                }
                else
                {
                    throw new UnauthorizedAccessException("Access denied");
                }
            
                base.OnAuthorization(filterContext);
            }
        }

        private bool GetUserNameAndPassword(AuthorizationContext filterContext, out string username, out string password, out AuthType authType)
        {
            authType = AuthType.basic;
            username = string.Empty;
            password = string.Empty;
            var authHeader = filterContext.HttpContext.Request.Headers["Authorization"];
            if (authHeader == null) return false;
            char[] delims = { ' ' };
            var authHeaderTokens = authHeader.Split(new char[] { ' ' });
            if (authHeaderTokens[0].Contains("Basic"))
            {
                var decodedStr = DecodeFrom64(authHeaderTokens[1]);
                var unpw = decodedStr.Split(new[] { ':' });
                username = unpw[0];
                password = unpw[1];
            }
            else
            {
                if (authHeaderTokens.Length > 1)
                    username = DecodeFrom64(authHeaderTokens[1]);
                authType = AuthType.cookie;
            }
            return true;
        }

        private bool Authenticate(AuthorizationContext filterContext, out string username)
        {
            bool isAuthenticated = false;
            var loginService = Injector.Get<ILoginService>();
            string password;
            AuthType authenticationType;

            if (GetUserNameAndPassword(filterContext, out username, out password, out authenticationType))
            {

                if (authenticationType == AuthType.basic)
                {
                    if (securityFactory.AuthenticateUser(username, password))
                    {
                        isAuthenticated = true;
                    }
                    else
                    {
                        loginService.Logout();
                    }
                }
                else //authType == cookie
                {
                    var authCookie = filterContext.HttpContext.Request.Cookies[FormsAuthentication.FormsCookieName];
                    if (authCookie == null) return false;
                    var authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                    if (securityFactory.IsAuthenticated)
                        isAuthenticated = true;

                    username = authTicket.Name;
                }
            }
            else
            {
                throw new UnauthorizedAccessException("Access denied");
            }

            return isAuthenticated;
        }

        private string DecodeFrom64(string encodedData)
        {

            byte[] encodedDataAsBytes
                = System.Convert.FromBase64String(encodedData);
            string returnValue =
               System.Text.Encoding.ASCII.GetString(encodedDataAsBytes);

            return returnValue;
        }
    }
}
