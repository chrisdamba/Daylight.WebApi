using System;

namespace Daylight.WebApi.Contracts.Entities.Events
{
    /// <summary>
    /// Event args for the UserAuthenticated event
    /// </summary>
    public class UserAuthenticatedEventArgs : EventArgs
    {
        /// <summary>
        /// The user name
        /// </summary>
        private readonly string userName;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserAuthenticatedEventArgs"/> class.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        public UserAuthenticatedEventArgs(string userName)
        {
            this.userName = userName;
        }

        /// <summary>
        /// Gets the name of the user.
        /// </summary>
        /// <value>The name of the user.</value>
        public string UserName
        {
            get { return userName; }
        }
    }
}
