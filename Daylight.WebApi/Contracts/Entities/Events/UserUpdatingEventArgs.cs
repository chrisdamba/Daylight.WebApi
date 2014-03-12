using System;

namespace Daylight.WebApi.Contracts.Entities.Events
{
    /// <summary>
    /// The event arguments when a user is updated
    /// </summary>
    public class UserUpdatingEventArgs : EventArgs
    {
        /// <summary>
        /// The user before the chanages
        /// </summary>
        public User BeforeUser;

        /// <summary>
        /// The user after the changes
        /// </summary>
        public User AfterUser;
    }
}
