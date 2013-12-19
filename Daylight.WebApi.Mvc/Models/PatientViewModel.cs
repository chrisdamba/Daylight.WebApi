using System;
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
            Username = patient.Username;
            RelationshipStatus = patient.RelationshipStatus;
            var patientAddress = patient.Addresses.FirstOrDefault();
            if (patientAddress != null)
                Address = string.Format("{0}, {1}, {2}, {3}", patientAddress.Building, patientAddress.Street, patientAddress.AreaLocality, patientAddress.City);
            var patientName = patient.Names.FirstOrDefault();
            if (patientName != null)
                Name = (patient.Names != null) ? string.Format("{0} {1}", patientName.GivenName,
                                                                  patientName.FamilyName) : string.Empty;
            Gender = (patient.Gender == "M") ? "Male" : "Female";
            var patientPhone = patient.Telecoms.FirstOrDefault(x => x.TelecomType == "cellphone");
            if (patientPhone != null) Phone = patientPhone.Value;

            var patientEmail = patient.Telecoms.FirstOrDefault(x => x.TelecomType == "email");
            if (patientEmail != null) Email = patientEmail.Value;
        }

        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public string Username { get; set; }

        [DataMember]
        public string Gender { get; set; }

        [DataMember]
        public string RelationshipStatus { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Phone { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public DateTime Dob { get; set; }

        [DataMember]
        public string Address { get; set; }

        public Patient ToEntity(Patient patient)
        {
            if (patient == null)
            {
                patient = new Patient {State = EntityState.Added, DateBecamePatient = DateTime.Now };
            }
            else
                patient.State = EntityState.Modified;

            patient.Username = Username;
            return patient;
        }
    }
}
