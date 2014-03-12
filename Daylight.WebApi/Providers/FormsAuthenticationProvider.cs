using System.Web.Security;
using Daylight.WebApi.Contracts.Providers;

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
        public void Authenticate(string userName)
        {
            FormsAuthentication.SetAuthCookie(userName, false);
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
