using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
{
    public interface IEventRepository
    {
        void Create(Event calendaEvent);

        void Update(Event calendaEvent);

        Event Get(Guid id);

        IEnumerable<Event> Get(IEnumerable<Guid> ids);

        IEnumerable<Guid> List(out int totalCount, Expression<Func<Event, bool>> criteria = null, int page = 1,
                               int count = int.MaxValue);
    }
}
