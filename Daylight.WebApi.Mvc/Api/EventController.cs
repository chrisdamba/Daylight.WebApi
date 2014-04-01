using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Attributes;
using Daylight.WebApi.Mvc.Factories;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Api
{
    /// <summary>
    /// An MVC API Controller for authoring and viewing calendar events.
    /// </summary>
    [Backbone]
    public class EventController : ApiController
    {
        private readonly IEventViewFactory viewFactory;
        private readonly IItemFactory itemFactory;

        public EventController()
        {
        }

        public EventController(IEventViewFactory viewFactory, IItemFactory itemFactory)
        {
            this.viewFactory = viewFactory;
            this.itemFactory = itemFactory;
        }
        
        // GET api/events
        public IEnumerable<EventViewModel> Get(EventFilter? filter, string search = null, int skip = 0, int take = int.MaxValue)
        {
            if (skip < 0)
            {
                throw this.BadRequestException("Skip must be a non-negative value");
            }

            if (take < 0)
            {
                throw this.BadRequestException("Take must be a non-negative value");
            }
            return viewFactory.List(filter ?? EventFilter.Default, search, skip, take);
        }

        // GET api/patients
        public IEnumerable<EventViewModel> Get(string search = null, int skip = 0, int take = int.MaxValue)
        {
            return Get(null, search, skip, take);
        }

         // GET api/events/{eventId}
        public EventViewModel Get(Guid eventId)
        {
            return viewFactory.GetEvent(eventId);
        }

        // POST api/events
        public EventViewModel Post([FromBody]EventViewModel model)
        {
            var returnId = Guid.Empty;
            if (model != null && ModelState.IsValid && model.Id == Guid.Empty)
            {
                returnId = itemFactory.Save(model).EventId;
            }
            else
            {
                throw this.BadRequestException("Event is null or invalid");
            }

            return viewFactory.GetEvent(returnId);
        }

        // PUT api/events
        public EventViewModel Put([FromBody]EventViewModel model)
        {
            if (model == null || !ModelState.IsValid || model.Id == Guid.Empty)
            {
                throw this.BadRequestException("Event is null or invalid");
            }

            var calendarEvent = itemFactory.Save(model);
            return viewFactory.GetEvent(calendarEvent.EventId);
        }

        // DELETE api/events/{eventId}
        public HttpResponseMessage Delete(Guid eventId)
        {
            itemFactory.Delete(eventId);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
