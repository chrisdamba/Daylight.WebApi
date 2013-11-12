using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Daylight.WebApi.Contracts.Entities
{
    /// <summary>
    /// An enumeration of actions to audit on.
    /// </summary>
    public enum AuditAction
    {
        /// <summary>
        /// The patient was created.
        /// </summary>
        Created = 1,

        /// <summary>
        /// The patient was updated.
        /// </summary>
        Updated = 2,

        /// <summary>
        /// The patient was deleted.
        /// </summary>
        Deleted = 3,
   
    }
}
