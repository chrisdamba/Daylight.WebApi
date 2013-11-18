using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    public class MedicationViewModel
    {
        public MedicationViewModel()
        {
        }

        public MedicationViewModel(Medication medication)
        {
            this.Id = medication.MedicationId;
            this.PatientId = medication.PatientId;
            this.ConditionId = medication.ConditionId;
            this.ConceptId = medication.ConceptId;
            this.Name = medication.Name;
            this.Cost = medication.Cost;
            this.StartedAt = medication.StartedAt;
            this.FinishedAt = medication.FinishedAt;
        }

        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid ConditionId { get; set; }
        public string Name { get; set; }
        public int ConceptId { get; set; }
        public decimal Cost { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime? FinishedAt { get; set; }
    }
}