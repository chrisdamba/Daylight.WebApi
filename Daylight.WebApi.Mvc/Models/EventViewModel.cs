using System;
using System.Data;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class EventViewModel
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="EventViewModel"/> class.
        /// </summary>
        public EventViewModel()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="EventViewModel"/> class.
        /// </summary>
        /// <param name="calendarEvent">The calendar event.</param>
        public EventViewModel(Event calendarEvent)
        {
            Id = calendarEvent.EventId;
            Title = calendarEvent.Title;
            Description = calendarEvent.Description;
            Location = calendarEvent.Location;
            Colour = calendarEvent.Colour;
            StartDate = calendarEvent.StartDate;
            EndDate = calendarEvent.EndDate;
        }

        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        [DataMember]
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        [DataMember]
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        [DataMember]
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the location.
        /// </summary>
        [DataMember]
        public string Location { get; set; }

        /// <summary>
        /// Gets or sets the colour.
        /// </summary>
        [DataMember]
        public string Colour { get; set; }

        /// <summary>
        /// Gets or sets the start date.
        /// </summary>
        [DataMember]
        public DateTime StartDate { get; set; }

        /// <summary>
        /// Gets or sets the end date.
        /// </summary>
        [DataMember]
        public DateTime EndDate { get; set; }

        public Event ToEntity(Event calendarEvent)
        {
            if (calendarEvent == null)
            {
                calendarEvent = new Event { State = EntityState.Added, StartDate = DateTime.Now };
            }
            else
            {
                calendarEvent.State = EntityState.Modified;
                calendarEvent.StartDate = StartDate;
            }

            // Populate properties
            calendarEvent.EventId = Id;
            calendarEvent.Title = Title;
            calendarEvent.Description = Description;
            calendarEvent.Location = Location;
            calendarEvent.Colour = Colour;
            calendarEvent.EndDate = EndDate;

            return calendarEvent;
        }
    }
}