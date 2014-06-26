using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
{
    public interface IBillRepository
    {
        void Create(Bill bill);

        void Update(Bill bill);

        Bill Get(Guid id);

        IEnumerable<Bill> Get(IEnumerable<Guid> ids);

        IEnumerable<Guid> List(out int totalCount, Expression<Func<Bill, bool>> criteria = null, int page = 1,
                               int count = int.MaxValue);
    }
}
