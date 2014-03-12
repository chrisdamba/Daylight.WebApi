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
        void Authenticate(string userName);

        /// <summary>
        /// Signs the current user out.
        /// </summary>
        void SignOut();
    }
}
