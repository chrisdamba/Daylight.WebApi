using System;

namespace Daylight.WebApi.Contracts
{
    [Flags]
    public enum PatientFilter
    {
        Default = Outpatient | Inpatient,

        Deceased = 1,

        Outpatient = 2,

        Inpatient = 4
    }
}
