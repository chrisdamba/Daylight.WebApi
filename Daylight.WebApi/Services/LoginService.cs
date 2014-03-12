using System.Web.Security;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Providers;

namespace Daylight.WebApi.Services
{
    /// <summary>
    /// An implementation of the <see cref="ILoginService"/> interface.
    /// </summary>
    public class LoginService : ILoginService
    {
        private readonly IAuthenticationProvider authenticationProvider;
        private readonly ISecurityFactory securityFactory;

        public LoginService(IAuthenticationProvider authenticationProvider, ISecurityFactory securityFactory)
        {
                
        }
        
        public LogInResultCode Login(string username, string password)
        {
            // Check username
            if (string.IsNullOrEmpty(username))
            {
                return LogInResultCode.UserNameRequired;
            }

            // Check password
            if (string.IsNullOrEmpty(password))
            {
                return LogInResultCode.PasswordRequired;
            }
        }

        public void Logout()
        {
            FormsAuthentication.SignOut();
        }
    }
}
