using System;

namespace Daylight.WebApi.Contracts.Entities.Events
{
    /// <summary>
    /// Event arguments for event when a new user is created
    /// </summary>
    public class UserCreatedEventArguments : EventArgs
    {
        /// <summary>
        /// Gets or sets the user.
        /// </summary>
        /// <value>The user.</value>
        public IUser User { get; set; }
    }
}
