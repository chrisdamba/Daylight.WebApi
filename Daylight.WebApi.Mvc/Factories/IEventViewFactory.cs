using System;
using System.Collections.Generic;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Factories
{
    public interface IEventViewFactory
    {
        EventViewModel GetEvent(Guid eventId);

        IEnumerable<EventViewModel> List(EventFilter filter, string search = null, int skip = 0, int take = int.MaxValue);
    }
}
