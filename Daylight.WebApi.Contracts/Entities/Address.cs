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

    public partial class Address : IStateEntity
    {
        public System.Guid AddressId { get; set; }
        public System.Guid PatientId { get; set; }
        public string Building { get; set; }
        public string Street { get; set; }
        public string AreaLocality { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public string Type { get; set; }
        public System.Data.Spatial.DbGeography GeoLocation { get; set; }
    
        public virtual Patient Patient { get; set; }

        private EntityState state = EntityState.Unchanged;
        public EntityState State { get { return state; } set { state = value; } }
    }
}