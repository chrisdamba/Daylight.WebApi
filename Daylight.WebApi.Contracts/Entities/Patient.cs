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
    
    public partial class Patient
    {
        public Patient()
        {
            this.Conditions = new HashSet<Condition>();
        }
    
        public System.Guid PatientId { get; set; }
        public bool IsDeleted { get; set; }
        public string Gender { get; set; }
        public string RelationshipStatus { get; set; }
        public System.DateTime DateOfBirth { get; set; }
        public System.DateTime DateBecamePatient { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    
        public virtual ICollection<Condition> Conditions { get; set; }
    }
}
