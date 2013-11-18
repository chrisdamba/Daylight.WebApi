
using System;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    public class ProcedureViewModel
    {
        public ProcedureViewModel()
        {
        }

        public ProcedureViewModel(Procedure procedure)
        {
            this.Id = procedure.ProcedureId;
            this.PatientId = procedure.PatientId;
            this.ConditionId = procedure.ConditionId;
            this.ConceptId = procedure.ConceptId;
            this.Name = procedure.Name;
            this.Cost = procedure.Cost;
        }

        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid ConditionId { get; set; }
        public int ConceptId { get; set; }
        public string Name { get; set; }
        public decimal Cost { get; set; }
    }
}