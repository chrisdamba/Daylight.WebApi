using System.Web.Security;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Providers;
using Daylight.WebApi.Providers;

namespace Daylight.WebApi.Services
{
    /// <summary>
    /// An implementation of the <see cref="ILoginService"/> interface.
    /// </summary>
    public class LoginService : ILoginService
    {
        private readonly IAuthenticationProvider authenticationProvider;
        private readonly ISecurityFactory securityFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="LoginService"/> class.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        public LoginService(ISecurityFactory securityFactory)
            : this(new FormsAuthenticationProvider(), securityFactory)
        {
        }
        
        /// <summary>
        /// Initializes a new instance of the <see cref="LoginService"/> class.
        /// </summary>
        /// <param name="authenticationProvider">The authentication provider.</param>
        /// <param name="securityFactory">The security factory.</param>
        public LoginService(IAuthenticationProvider authenticationProvider, ISecurityFactory securityFactory)
        {
            this.authenticationProvider = authenticationProvider;
            this.securityFactory = securityFactory;
        }
        
        public LogInResultCode Login(string username, string password, bool rememberMe=false)
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

            // Check authentication
            var authenticated = securityFactory.AuthenticateUser(username.Trim(), password);
            if (!authenticated)
            {
                securityFactory.IsAuthenticated = false;
                return LogInResultCode.InvalidUserName;
            }

            // Authenticate user
            authenticationProvider.Authenticate(username.Trim(), rememberMe);

            // Check password expiry
            var passwordExpired = securityFactory.GetUser(username.Trim()).PasswordExpired;
            if (passwordExpired)
            {
                return LogInResultCode.ChangePassword;
            }
            
            return LogInResultCode.None;
        }

        /// <summary>
        /// Logs out the current user, if there is one logged in.
        /// </summary>
        public void Logout()
        {
            authenticationProvider.SignOut();
            securityFactory.IsAuthenticated = false;
        }
    }
}
