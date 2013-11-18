using System;
using System.Linq;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    public class ConditionViewModel
    {
        private MedicationViewModel[] medications;
        private ProcedureViewModel[] procedures;

        public ConditionViewModel()
        {
        }

        public ConditionViewModel(Condition condition)
        {
            this.Id = condition.ConditionId;
            this.PatientId = condition.ConditionId;
            this.ConceptId = condition.ConceptId;
            this.Name = condition.Name;
            this.StartedAt = condition.StartedAt;
            this.FinishedAt = condition.FinishedAt;
            this.Medications = condition.Medications.Select(m => new MedicationViewModel(m)).ToArray();
            this.Procedures = condition.Procedures.Select(p => new ProcedureViewModel(p)).ToArray();
        }

        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public int ConceptId { get; set; }
        public string Name { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime? FinishedAt { get; set; }
        public MedicationViewModel[] Medications
        {
            get { return medications ?? new MedicationViewModel[0]; } 
            set { medications = value; }
        }
        public ProcedureViewModel[] Procedures 
        {
            get { return procedures ?? new ProcedureViewModel[0]; }
            set { procedures = value; }
        }
    }
}