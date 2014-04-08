using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Repositories.Data;

namespace Daylight.WebApi.Repositories
{
    public class EventRepository : RepositoryBase<IDataContext, DataContext>, IEventRepository
    {
        /// <summary>
        /// Creates the specified calendar event.
        /// </summary>
        /// <param name="calendarEvent">The calendar event.</param>
        public void Create(Event calendarEvent)
        {
            using (var context = CreateContext)
            {
                if (calendarEvent.EventId == Guid.Empty)
                {
                    calendarEvent.EventId = Guid.NewGuid();
                }

                context.Events.Add(calendarEvent);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Updates the specified calenda event.
        /// </summary>
        /// <param name="calendaEvent">The calenda event.</param>
        public void Update(Event calendarEvent)
        {
            using (var context = CreateContext)
            {
                calendarEvent.EventId = calendarEvent.EventId == Guid.Empty ? Guid.NewGuid() : calendarEvent.EventId;
                context.Entry(calendarEvent).State = calendarEvent.State;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Gets the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public Event Get(Guid id)
        {
            using (var context = CreateContext)
            {
                return context.Events.SingleOrDefault(x => x.EventId == id);
            }
        }

        /// <summary>
        /// Gets the specified ids.
        /// </summary>
        /// <param name="ids">The ids.</param>
        /// <returns></returns>
        public IEnumerable<Event> Get(IEnumerable<Guid> ids)
        {
            using (var context = CreateContext)
            {
                return context.Events.Where(x => ids.Contains(x.EventId)).ToArray();
            }
        }

        /// <summary>
        /// Lists the specified total count.
        /// </summary>
        /// <param name="totalCount">The total count.</param>
        /// <param name="criteria">The criteria.</param>
        /// <param name="page">The page.</param>
        /// <param name="count">The count.</param>
        /// <returns></returns>
        public IEnumerable<Guid> List(out int totalCount, Expression<Func<Event, bool>> criteria = null, int page = 1, int count = Int32.MaxValue)
        {
            using (var context = CreateContext)
            {
                // Default criteria to Everything if not set
                if (criteria == null) criteria = a => true;

                // Establish a LINQ to SQL Query
                var query = context.Events.Where(criteria).OrderByDescending(a => a.Start);

                // Execute for Total Count
                totalCount = query.Count();

                // Execute for Sub-set of requested entries
                return query.Select(a => a.EventId).Skip((page - 1) * count).Take(count).ToArray();
            }
        }
    }
}
