using System;
using System.Collections.Generic;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts.Services
{
    public interface IEventService
    {
        Event Get(Guid id);

        IEnumerable<Event> List(out int totalCount, EventFilter filter, string search, int skip = 0, int take = 100);

        void Delete(Guid id);

        void Save(Event calendarEvent);
    }
}
