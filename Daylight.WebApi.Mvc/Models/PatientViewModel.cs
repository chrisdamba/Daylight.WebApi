using System;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Core.Attributes;


namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class PatientViewModel
    {
        private AddressViewModel[] addresses;
        private NameViewModel[] names;
        private RelationshipViewModel[] relationships;
        private TelecomsViewModel[] telecoms;

        public PatientViewModel()
        {
        }

        public PatientViewModel(Patient patient)
        {
            this.Id = patient.PatientId;
            this.Dob = patient.DateOfBirth;
            this.DobEstimate = patient.DateOfBirthEstimate;
            this.Username = patient.Username;
            this.RelationshipStatus = patient.RelationshipStatus;
            this.Addresses = patient.Addresses.Select(x => new AddressViewModel(x)).ToArray();
            this.Names = patient.Names.Select(x => new NameViewModel(x)).ToArray();
            this.Relationships = patient.Relationships.Select(x => new RelationshipViewModel(x)).ToArray();
            this.Telecoms = patient.Telecoms.Select(x => new TelecomsViewModel(x)).ToArray();
        }

        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public string Username { get; set; }

        [DataMember]
        public string RelationshipStatus { get; set; }

        [DataMember]
        public NameViewModel[] Names
        {
            get { return names ?? new NameViewModel[0]; }
            set { names = value; }
        }

        [DataMember]
        public string[] OtherNames { get; set; }

        [DataMember]
        public TelecomsViewModel[] Telecoms {
            get { return telecoms ?? new TelecomsViewModel[0]; }
            set { telecoms = value; }
        }

        [DataMember]
        public DateTime Dob { get; set; }
        
        [DataMember]
        public bool DobEstimate { get; set; }

        [DataMember]
        public RelationshipViewModel[] Relationships
        {
            get { return relationships ?? new RelationshipViewModel[0]; }
            set { relationships = value; }
        }

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
                patient = new Patient {State = EntityState.Added, DateBecamePatient = DateTime.Now };
            }
            else
                patient.State = EntityState.Modified;

            patient.Username = Username;
            return patient;
        }
    }
}
