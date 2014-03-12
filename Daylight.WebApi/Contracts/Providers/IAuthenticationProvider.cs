namespace Daylight.WebApi.Contracts.Providers
{
    /// <summary>
    /// A provider for authentication of a user, such as by using <c>FormsAuthentication</c>.
    /// </summary>
    public interface IAuthenticationProvider
    {
        /// <summary>
        /// Signs the user with the given username in.
        /// </summary>
        /// <param name="userName">The username to log in.</param>
        /// <param name="rememberMe">if set to <c>true</c> [remember me].</param>
        void Authenticate(string userName, bool rememberMe = false);

        /// <summary>
        /// Signs the current user out.
        /// </summary>
        void SignOut();
    }
}
