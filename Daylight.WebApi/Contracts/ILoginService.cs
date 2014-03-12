namespace Daylight.WebApi.Contracts
{
    /// <summary>
    /// A service interface for high level login functionality, supporting login controllers.
    /// </summary>
    public interface ILoginService
    {
        /// <summary>
        /// Logs in the user with the provided username and password combination, provided all validity
        /// checks pass.
        /// These checks include checking both values are supplied, the combination is valid and the
        /// user isn't awaiting verification. If the login is successful, the return value is None, otherwise
        /// its a value indicating the reason it failed.
        /// </summary>
        /// <param name="username">The username to log in.</param>
        /// <param name="password">The password.</param>
        /// <param name="rememberMe">if set to <c>true</c> [remember me].</param>
        /// <returns>
        /// The result of the attempted login.
        /// </returns>
        LogInResultCode Login(string username, string password, bool rememberMe = false);

        /// <summary>
        /// Logs out the current user, if there is one logged in.
        /// </summary>
        void Logout();
    }
}
