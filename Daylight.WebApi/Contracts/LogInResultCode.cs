namespace Daylight.WebApi.Contracts
{
    public enum LogInResultCode
    {
        /// <summary>
        /// There was no return code (the login was successful if attempted).
        /// </summary>
        None = 0,

        /// <summary>
        /// The password is required.
        /// </summary>
        PasswordRequired = 1,

        /// <summary>
        /// The user name is required.
        /// </summary>
        UserNameRequired = 2,

        /// <summary>
        /// The user name and password combination is invalid.
        /// </summary>
        InvalidUserName = 3,

        /// <summary>
        /// Cookies are disabled, and are required.
        /// </summary>
        CookiesDisabled = 4,

        /// <summary>
        /// The username and/or password contains invalid characters or sequences.
        /// </summary>
        InvalidArguments = 5,

        /// <summary>
        /// The username password combination is valid, but the account isn't verified.
        /// </summary>
        NotVerified = 6
    }
}
