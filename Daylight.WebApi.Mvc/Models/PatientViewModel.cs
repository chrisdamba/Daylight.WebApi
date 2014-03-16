using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;


namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class PatientViewModel
    {
        private int? conditionsCount;
        private ConditionViewModel[] conditions;
        
        public PatientViewModel()
        {
        }

        public PatientViewModel(Patient patient)
        {
            Id = patient.PatientId;
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
            Conditions = patient.Conditions.Select(x => new ConditionViewModel(x)).ToArray();
        }
        [DataMember]
        public ConditionViewModel[] Conditions
        {
            get { return conditions ?? new ConditionViewModel[0]; }
            set { conditions = value; }
        }

        [DataMember]
        public int ConditionsCount
        {
            get { return conditionsCount ?? Conditions.Length; } 
            set
            {
                // HACK to prevent Newtonsoft Deserialization exceptions from bad JSON blobs
            }
        }

        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public int Age { get; set; }

        [DataMember]
        public string Gender { get; set; }

        [DataMember]
        public string RelationshipStatus { get; set; }

        [DataMember]
        public string FirstName { get; set; }

        [DataMember]
        public string LastName { get; set; }

        [DataMember]
        public string Phone { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public string Dob { get; set; }

        [DataMember]
        public string Address { get; set; }

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
