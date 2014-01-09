using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;


namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class PatientViewModel
    {
        public PatientViewModel()
        {
        }

        public PatientViewModel(Patient patient)
        {
            Id = patient.PatientId;
            Dob = patient.DateOfBirth;
            DateRegistered = patient.DateBecamePatient;
            RelationshipStatus = patient.RelationshipStatus;
            Gender = patient.Gender;
            FirstName = patient.FirstName;
            LastName = patient.LastName;
            Address = patient.Address;
            Phone = patient.Phone;
            Email = patient.Email;
        }

        [DataMember]
        public Guid Id { get; set; }

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
        public DateTime Dob { get; set; }

        [DataMember]
        public string Address { get; set; }

        [DataMember]
        public DateTime DateRegistered { get; set; }

        

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
            patient.DateOfBirth = Convert.ToDateTime(Dob);
            patient.RelationshipStatus = RelationshipStatus;
            patient.DateBecamePatient = Convert.ToDateTime(DateRegistered);
            patient.FirstName = FirstName;
            patient.LastName = LastName;
            patient.Phone = Phone;
            patient.Email = Email;
            patient.Address = Address;
            
            return patient;
        }
    }
}
