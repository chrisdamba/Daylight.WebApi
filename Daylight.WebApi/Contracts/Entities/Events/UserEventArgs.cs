using System;

namespace Daylight.WebApi.Contracts.Entities.Events
{
    public class UserEventArgs : EventArgs
    {
        public UserEventArgs(Guid id)
        {
            this.UserId = id;
        }

        public Guid UserId { get; private set; }
    }
}
