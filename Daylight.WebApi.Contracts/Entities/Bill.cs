//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Daylight.WebApi.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class Bill : IStateEntity
    {
        public Bill()
        {
            this.Payments = new HashSet<Payment>();
            this.PatientBills = new HashSet<PatientBill>();
        }
    
        public System.Guid BillId { get; set; }
        public Nullable<System.DateTime> DueDate { get; set; }
        public decimal Amount { get; set; }
        public string Details { get; set; }
    
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<PatientBill> PatientBills { get; set; }
    }
}
