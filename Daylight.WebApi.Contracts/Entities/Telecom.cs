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

    public partial class Telecom : IStateEntity
    {
        public System.Guid Id { get; set; }
        public System.Guid PatientId { get; set; }
        public string TelecomType { get; set; }
        public string Use { get; set; }
        public string Value { get; set; }
        public Nullable<short> PreferenceOrder { get; set; }
    
        public virtual Patient Patient { get; set; }

        private EntityState state = EntityState.Unchanged;
        public EntityState State { get { return state; } set { state = value; } }
    }
}
