using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Security.Principal;
using System.Text;
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
            if (skipAuthorization) return;
            
            if (filterContext.HttpContext.User.Identity.IsAuthenticated && filterContext.Result is HttpUnauthorizedResult)
            {
                throw new UnauthorizedAccessException("Access denied");
            }

            /*if (!Authenticate(filterContext))
            {
                throw new UnauthorizedAccessException("Access denied");
            }*/
        }

        private bool Authenticate(AuthorizationContext filterContext)
        {
            var user = securityFactory.GetUser();
            if (user != null)
            {
                filterContext.HttpContext.User = new GenericPrincipal(new GenericIdentity(user.UserName), null);
                return true;
            }
            var authCookie = filterContext.HttpContext.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie == null) return false;
            var authTicket = FormsAuthentication.Decrypt(authCookie.Value);
            filterContext.HttpContext.User = new GenericPrincipal(new GenericIdentity(authTicket.Name), null);
            filterContext.Result = new HttpStatusCodeResult(401);
            return true;
        }
        
    }
}
