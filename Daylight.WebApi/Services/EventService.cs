using System;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Contracts.Services;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            this.eventRepository = eventRepository;
        }

        public EventService()
            :this(Injector.Get<IEventRepository>())
        {
        }

        public Event Get(Guid id)
        {
            return eventRepository.Get(id);
        }

        public IEnumerable<Event> List(out int totalCount, EventFilter filter, string search, int skip = 0, int take = 100)
        {
            int page = (skip/take) + 1;

            Expression<Func<Event, bool>> query = null;

            if (!string.IsNullOrEmpty(search))
                query = x => (x.Title.Contains(search) || x.Colour.Contains(search) || x.Description.Contains(search) || x.Location.Contains(search));
            var results = eventRepository.List(out totalCount, query, page, take);
            return totalCount == 0 ? new Event[0] : eventRepository.Get(results);
        }

        public void Delete(Guid id)
        {
            var calendarEvent = Get(id);
            if (calendarEvent != null)
            {
                calendarEvent.State = EntityState.Deleted;
                eventRepository.Update(calendarEvent);
            }
        }

        public void Save(Event calendarEvent)
        {
            if (calendarEvent.EventId == Guid.Empty)
            {
                calendarEvent.EventId = Guid.NewGuid();
                calendarEvent.State = EntityState.Added;
            }

            if (calendarEvent.State == EntityState.Added)
            {
                eventRepository.Create(calendarEvent);
            }
            else
            {
                eventRepository.Update(calendarEvent);
            }

        }
    }
}
