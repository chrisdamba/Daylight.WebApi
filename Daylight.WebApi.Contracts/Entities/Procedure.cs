//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Daylight.WebApi.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Data;

    public partial class Procedure : IStateEntity
    {
        public System.Guid ProcedureId { get; set; }
        public System.Guid PatientId { get; set; }
        public int ConceptId { get; set; }
        public string Name { get; set; }
        public decimal Cost { get; set; }
        public string Extension { get; set; }
        public string Code { get; set; }
		public System.Guid ConditionId { get; set; }
        public System.DateTime StartedAt { get; set; }
        public Nullable<System.DateTime> FinishedAt { get; set; }
    
        public virtual Patient Patient { get; set; }
		public virtual Condition Condition { get; set; }

        private EntityState state = EntityState.Unchanged;
        public EntityState State { get { return state; } set { state = value; } }
    }
}
