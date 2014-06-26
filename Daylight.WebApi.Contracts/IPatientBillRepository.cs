using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
{
    public interface IPatientBillRepository
    {
        void Create(PatientBill bill);

        void Update(PatientBill bill);

        PatientBill Get(Guid id);

        IEnumerable<PatientBill> Get(IEnumerable<Guid> ids);

        IEnumerable<Guid> List(out int totalCount, Expression<Func<PatientBill, bool>> criteria = null, int page = 1,
                               int count = int.MaxValue);
    }
}
