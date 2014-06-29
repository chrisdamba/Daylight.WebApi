using System;
using System.Linq;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Contracts.Services;

namespace Daylight.WebApi.Services
{
    public class BillService : IBillService
    {
        private readonly IBillRepository billRepository;
        private readonly IPatientRepository patientRepository;

        public BillService(IBillRepository billRepository, IPatientRepository patientRepository)
        {
            this.billRepository = billRepository;
            this.patientRepository = patientRepository;
        }

        public void Save(Bill bill, Guid conditionId, Guid patientId)
        {
            var patient = patientRepository.Get(patientId);
            var condition = patient.Conditions.SingleOrDefault(x => x.ConditionId == conditionId);
            billRepository.Create(bill);
            var patientBill = new PatientBill
            {
                Bill = bill,
                Patient = patient,
                Condition = condition
            };

            patient.PatientBills.Add(patientBill);
            patientRepository.Update(patient);
        }
    }
}
