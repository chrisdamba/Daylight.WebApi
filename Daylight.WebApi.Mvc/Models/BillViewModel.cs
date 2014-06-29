using System;
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
            DueDate = bill.DueDate;
            Details = bill.Details;
            Amount = bill.Amount;
        }

        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public DateTime? DueDate { get; set; }

        [DataMember]
        public string Details { get; set; }

        [DataMember]
        public decimal Amount { get; set; }

    }
}