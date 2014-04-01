using System;
using System.Collections.Generic;
using System.Linq;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Exceptions;
using Daylight.WebApi.Core.IoC;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Factories
{
    public class EventViewFactory : IEventViewFactory
    {
        private readonly IEventService eventService;

        public EventViewFactory()
            :this(Injector.Get<IEventService>())
        {
        }

        public EventViewFactory(IEventService eventService)
        {
            this.eventService = eventService;
        }
        
        public EventViewModel GetEvent(Guid eventId)
        {
            var calendarEvent = eventService.Get(eventId);
            if (calendarEvent == null)
            {
                throw new UnavailableItemException("Event not found");
            }

            return new EventViewModel(calendarEvent);
        }

        public IEnumerable<EventViewModel> List(EventFilter filter, string search = null, int skip = 0, int take = Int32.MaxValue)
        {
            int totalCount;
            return eventService.List(out totalCount, filter, search, skip, take)
                .Select(x => new EventViewModel(x))
                .ToArray();
        }
    }
}