using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
{
    public interface IPatientRepository
    {
        void Create(Patient patient);

        void Update(Patient patient);

        Patient Get(Guid id);

        IEnumerable<Patient> Get(IEnumerable<Guid> ids);

        IEnumerable<Guid> List(out int totalCount, Expression<Func<Patient, bool>> criteria = null, int page = 1,
                               int count = int.MaxValue);
    }
}
