using System;

namespace Daylight.WebApi.Contracts.Entities.Events
{
    public class UserPasswordChangedEventArgs : EventArgs
    {
        /// <summary>
        /// Gets or sets the user id.
        /// </summary>
        /// <value>
        /// The user id.
        /// </value>
        public Guid UserId { get; set; }

        /// <summary>
        /// Gets or sets the password.
        /// </summary>
        /// <value>
        /// The password.
        /// </value>
        public string Password { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="UserPasswordChangedEventArgs"/> class.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="password">The password.</param>
        public UserPasswordChangedEventArgs(Guid userId, string password)
        {
            this.UserId = userId;
            this.Password = password;
        }
    }
}
