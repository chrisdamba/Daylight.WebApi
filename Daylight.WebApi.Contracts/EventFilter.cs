using System;

namespace Daylight.WebApi.Contracts
{
    [Flags]
    public enum EventFilter
    {
        Default = Appointment,

        Appointment = 1,

        Consultation = 2,

        Meeting = 4,
        
    }
}
