using System;

namespace Daylight.WebApi.Contracts
{
    [Flags]
    public enum PatientFilter
    {
        Default = Adults | Children,

        Deceased = 1,

        Adults = 2,

        Children = 4,

        Removed = 8,

        Recent = 16
    }
}
