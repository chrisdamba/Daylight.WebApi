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
        private NameViewModel[] names;
        private TelecomsViewModel[] telecoms;
        private AddressViewModel[] addresses;
        private RelationshipViewModel[] relationships;

        public PatientViewModel()
        {
        }

        public PatientViewModel(Patient patient)
        {
            Id = patient.PatientId;
            Dob = patient.DateOfBirth.ToString("D");
            Username = patient.Username;
            DateRegistered = patient.DateBecamePatient.ToString("D");
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
            if (patient.Names != null) Names = patient.Names.Select(x => new NameViewModel(x)).ToArray();
            if (patient.Addresses != null) Addresses = patient.Addresses.Select(x => new AddressViewModel(x)).ToArray();
            if (patient.Telecoms != null) Telecoms = patient.Telecoms.Select(x => new TelecomsViewModel(x)).ToArray();
            if (patient.Relationships != null) Relationships = patient.Relationships.Select(x => new RelationshipViewModel(x)).ToArray();
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
        public string Prefix { get; set; }

        [DataMember]
        public string Name { get; set; }

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

        /// <summary>
        /// Gets or sets an array of name models for the patient.
        /// </summary>
        [DataMember]
        public NameViewModel[] Names
        {
            get { return names ?? new NameViewModel[0]; }
            set { names = value; }
        }

        /// <summary>
        /// Gets or sets an array of telecoms models for the patient.
        /// </summary>
        [DataMember]
        public TelecomsViewModel[] Telecoms
        {
            get { return telecoms ?? new TelecomsViewModel[0]; }
            set { telecoms = value; }
        }

        /// <summary>
        /// Gets or sets an array of relationship models for the patient.
        /// </summary>
        [DataMember]
        public RelationshipViewModel[] Relationships
        {
            get { return relationships ?? new RelationshipViewModel[0]; }
            set { relationships = value; }
        }

        /// <summary>
        /// Gets or sets an array of address models for the patient.
        /// </summary>
        [DataMember]
        public AddressViewModel[] Addresses
        {
            get { return addresses ?? new AddressViewModel[0]; }
            set { addresses = value; }
        }

        public Patient ToEntity(Patient patient)
        {
            if (patient == null)
            {
                patient = new Patient {State = EntityState.Added};
            }
            else
                patient.State = EntityState.Modified;

            // Populate properties
            patient.Username = Username;
            patient.Gender = Gender;
            patient.DateOfBirth = Convert.ToDateTime(Dob);
            patient.RelationshipStatus = RelationshipStatus;
            patient.DateBecamePatient = Convert.ToDateTime(DateRegistered);

            patient.Names = Names.Select(x => x.ToEntity(patient.Names.SingleOrDefault(n => n.PatientId == x.Id))).ToList();
           
            
            return patient;
        }
    }
}
