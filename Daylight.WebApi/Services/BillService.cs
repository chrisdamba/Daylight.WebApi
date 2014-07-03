using System;
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

        public void Save(Bill bill, Guid patientId)
        {
            var patient = patientRepository.Get(patientId);
            
            patient.Bills.Add(bill);
            patientRepository.Update(patient);
        }
    }
}
