using System;
using System.Web;
using System.Web.Security;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Contracts.Providers;
using Daylight.WebApi.Security;
using Newtonsoft.Json;

namespace Daylight.WebApi.Providers
{
    /// <summary>
    /// An implementation of the <see cref="IAuthenticationProvider"/> interface which uses
    /// System.Web.Security.FormsAuthentication.
    /// </summary>
    public class FormsAuthenticationProvider : IAuthenticationProvider
    {
        /// <summary>
        /// Signs the user with the given username in.
        /// </summary>
        /// <param name="userName">The username to log in.</param>
        /// <param name="rememberMe">if set to <c>true</c> [remember me].</param>
        public void Authenticate(string userName, bool rememberMe = false)
        {
            var serializeModel = new CustomPrincipalSerializeModel { UserName = userName };
            var userData = JsonConvert.SerializeObject(serializeModel);
            var authTicket = new FormsAuthenticationTicket(
                1,
                userName,
                DateTime.Now,
                DateTime.Now.AddMinutes(20),
                rememberMe,
                userData);

            var encTicket = FormsAuthentication.Encrypt(authTicket);
            var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
            if (authTicket.IsPersistent) { authCookie.Expires = authTicket.Expiration; } 
            
            HttpContext.Current.Response.Cookies.Add(authCookie);
            FormsAuthentication.SetAuthCookie(userName, rememberMe);
        }

        /// <summary>
        /// Signs the current user out.
        /// </summary>
        public void SignOut()
        {
            FormsAuthentication.SignOut();
        }
    }
}
