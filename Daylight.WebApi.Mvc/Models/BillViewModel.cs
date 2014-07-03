using System;
using System.Data;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class BillViewModel
    {
        public BillViewModel()
        {
        }

        public BillViewModel(Bill bill)
        {
            Id = bill.BillId;
            DueDate = bill.DueDate.Value.ToString("dd/mm/yyyy");
            Details = bill.Details;
            Amount = bill.Amount;
        }

        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public string DueDate { get; set; }

        [DataMember]
        public string Details { get; set; }

        [DataMember]
        public decimal Amount { get; set; }

        public Bill ToEntity(Bill bill)
        {
            if (bill == null)
            {
                bill = new Bill { State = EntityState.Added };
            }
            else
            {
                bill.State = EntityState.Modified;
            }

            // Populate properties
            bill.DueDate = Convert.ToDateTime(DueDate);
            bill.Details = Details;
            bill.Amount = Amount;

            return bill;
        }

    }
}