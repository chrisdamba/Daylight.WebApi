using System;
using System.Collections.Generic;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
{
    public interface IInternalPatientService : IPatientService
    {
        IInternalPatientService OuterService { get; }

        IEnumerable<Patient> Get(IEnumerable<Guid> ids);
    }
}
