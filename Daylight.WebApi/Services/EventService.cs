using System;
using System.Collections.Generic;
using System.Data;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
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
            throw new NotImplementedException();
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
