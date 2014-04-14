using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Daylight.WebApi.Security
{
    /// <summary>
    /// A list of the product features
    /// </summary>
    public enum FeatureIdentifier
    {
        Patients = 1,
        Conditions = 2,
        Medications = 3,
        Vitals = 4,
        Administration = 7,
        UserAdministration = 10,
        Events = 11,

        Other = 99
    }
}
