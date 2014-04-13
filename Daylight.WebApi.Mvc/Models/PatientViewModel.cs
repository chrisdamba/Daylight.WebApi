using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Runtime.Serialization;
using System.Web.UI.WebControls;
using Daylight.WebApi.Contracts.Entities;


namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class PatientViewModel
    {
        private int? conditionsCount;
        private ConditionViewModel[] conditions;
        private VitalsViewModel[] vitals;
        
        public PatientViewModel()
        {
        }

        public PatientViewModel(Patient patient)
        {
            Id = patient.PatientId;
            Title = patient.Title;
            Dob = patient.DateOfBirth.ToLongDateString();
            DateRegistered = patient.DateBecamePatient.ToString("dddd, dd MMMM yyyy hh:mm");
            RelationshipStatus = patient.RelationshipStatus;
            Gender = (patient.Gender == "F") ? "Female": "Male";
            FirstName = patient.FirstName;
            LastName = patient.LastName;
            Address = patient.Address;
            Phone = patient.Phone;
            Email = patient.Email;
            Age = GetAge(patient.DateOfBirth);
            Conditions = patient.Conditions.Where(c => c.FinishedAt == null).Select(x => new ConditionViewModel(x)).ToArray();
            Vitals = patient.Vitals.Select(x => new VitalsViewModel(x)).OrderByDescending(x => x.DateRecorded).ToArray();
        }

        /// <summary>
        /// Gets or sets the conditions.
        /// </summary>
        /// <value>
        /// The conditions.
        /// </value>
        [DataMember]
        public ConditionViewModel[] Conditions
        {
            get { return conditions ?? new ConditionViewModel[0]; }
            set { conditions = value; }
        }

        /// <summary>
        /// Gets or sets the vitals.
        /// </summary>
        /// <value>
        /// The vitals.
        /// </value>
        [DataMember]
        public VitalsViewModel[] Vitals
        {
            get { return vitals ?? new VitalsViewModel[0]; }
            set { vitals = value; }
        }

        /// <summary>
        /// Gets or sets the conditions count.
        /// </summary>
        /// <value>
        /// The conditions count.
        /// </value>
        [DataMember]
        public int ConditionsCount
        {
            get { return conditionsCount ?? Conditions.Length; } 
            set
            {
                // HACK to prevent Newtonsoft Deserialization exceptions from bad JSON blobs
            }
        }

        /// <summary>
        /// Gets or sets the patient identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        [DataMember]
        public Guid Id { get; set; }


        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        [DataMember]
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets the patient age.
        /// </summary>
        /// <value>
        /// The age.
        /// </value>
        [DataMember]
        public int Age { get; set; }

        /// <summary>
        /// Gets or sets the patient gender.
        /// </summary>
        /// <value>
        /// The gender.
        /// </value>
        [DataMember]
        public string Gender { get; set; }

        /// <summary>
        /// Gets or sets the relationship status.
        /// </summary>
        /// <value>
        /// The relationship status.
        /// </value>
        [DataMember]
        public string RelationshipStatus { get; set; }

        /// <summary>
        /// Gets or sets the patient first name.
        /// </summary>
        /// <value>
        /// The first name.
        /// </value>
        [DataMember]
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the patient last name.
        /// </summary>
        /// <value>
        /// The last name.
        /// </value>
        [DataMember]
        public string LastName { get; set; }

        /// <summary>
        /// Gets or sets the patient phone.
        /// </summary>
        /// <value>
        /// The phone.
        /// </value>
        [DataMember]
        public string Phone { get; set; }

        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>
        /// The email.
        /// </value>
        [DataMember]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the date of birth.
        /// </summary>
        /// <value>
        /// The dob.
        /// </value>
        [DataMember]
        public string Dob { get; set; }

        /// <summary>
        /// Gets or sets the address.
        /// </summary>
        /// <value>
        /// The address.
        /// </value>
        [DataMember]
        public string Address { get; set; }

        /// <summary>
        /// Gets or sets the date the patient registered.
        /// </summary>
        /// <value>
        /// The date registered.
        /// </value>
        [DataMember]
        public string DateRegistered { get; set; }

        

        public Patient ToEntity(Patient patient)
        {
            if (patient == null)
            {
                patient = new Patient {State = EntityState.Added};
            }
            else
                patient.State = EntityState.Modified;

            // Populate properties
            patient.Gender = Gender;
            patient.Title = Title;
            patient.DateOfBirth = DateTime.ParseExact(Dob, "d/M/yyyy", CultureInfo.InvariantCulture);
            patient.RelationshipStatus = RelationshipStatus;
            patient.DateBecamePatient = Convert.ToDateTime(DateRegistered);
            patient.FirstName = FirstName;
            patient.LastName = LastName;
            patient.Phone = Phone;
            patient.Email = Email;
            patient.Address = Address;
            
            return patient;
        }

        private static int GetAge(DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob > today.AddYears(-age)) age--;
            return age <= 0 ? 1 : age;
        }
    }
}
