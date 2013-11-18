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
        private RelationshipViewModel[] relationships;
        private TelecomsViewModel[] telecoms;
        private ConditionViewModel[] conditions;
        private MedicationViewModel[] medications;
        private ProcedureViewModel[] procedures;

        public PatientViewModel()
        {
        }

        public PatientViewModel(Patient patient)
        {
            this.Id = patient.PatientId;
            this.DateOfBirth = patient.DateOfBirth;
            this.DobEstimate = patient.DateOfBirthEstimate;
            this.Username = patient.Username;
            this.RelationshipStatus = patient.RelationshipStatus;
            this.Addresses = patient.Addresses.Select(x => new AddressViewModel(x)).ToArray();
            this.Name = patient.Names.Select(x => new NameViewModel(x)).FirstOrDefault();
            this.Relationships = patient.Relationships.Select(x => new RelationshipViewModel(x)).ToArray();
            this.Telecoms = patient.Telecoms.Select(x => new TelecomsViewModel(x)).ToArray();
            this.Conditions = patient.Conditions.Select(c => new ConditionViewModel(c)).ToArray();
            this.Medications = patient.Medications.Select(m => new MedicationViewModel(m)).ToArray();
            this.Procedures = patient.Procedures.Select(p => new ProcedureViewModel(p)).ToArray();
        }

        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public string Username { get; set; }

        [DataMember]
        public string RelationshipStatus { get; set; }

        [DataMember]
        public NameViewModel Name { get; set; }
        
        [DataMember]
        public string[] OtherNames { get; set; }

        [DataMember]
        public TelecomsViewModel[] Telecoms {
            get { return telecoms ?? new TelecomsViewModel[0]; }
            set { telecoms = value; }
        }

        [DataMember]
        public DateTime DateOfBirth { get; set; }
        
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

        [DataMember]
        public ConditionViewModel[] Conditions
        {
            get { return conditions ?? new ConditionViewModel[0]; } 
            set { conditions = value; }
        }

        [DataMember]
        public MedicationViewModel[] Medications
        {
            get { return medications ?? new MedicationViewModel[0]; }
            set { medications = value; }
        }

        [DataMember]
        public ProcedureViewModel[] Procedures
        {
            get { return procedures ?? new ProcedureViewModel[0]; }
            set { procedures = value; }
        }

        public Patient ToEntity(Patient patient)
        {
            if (patient == null)
            {
                patient = new Patient {State = EntityState.Added, DateBecamePatient = DateTime.Now };
            }
            else
                patient.State = EntityState.Modified;

            // Identify deceased patients
            patient.Username = Username;
            return patient;
        }
    }
}
