using System;
using System.Collections.Generic;
using System.Data;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Services;
using MbUnit.Framework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Rhino.Mocks;
using Rhino.Mocks.Constraints;
using Assert = MbUnit.Framework.Assert;

namespace Daylight.WebApi.Tests.Domain.Services
{
    [TestFixture]
    public class BillServiceTests
    {
        private BillService target;
        private MockRepository mocks;
        private IBillRepository billRepository;
        private IPatientRepository patientRepository;

        [SetUp]
        public void SetUp()
        {
            mocks = new MockRepository();
            billRepository = mocks.StrictMock<IBillRepository>();
            patientRepository = mocks.StrictMock<IPatientRepository>();

            target = new BillService(billRepository, patientRepository);
        }

        [Test]
        public void Save_CreatePatientBill_ReturnsId()
        {
            var billId = Guid.Empty;
            var patientId = Guid.NewGuid();
            var conditionId = Guid.NewGuid();

            var bill = new Bill
            {
                Amount = (decimal) 25.00,
                BillId = billId,
                Details = "Bill for the patient visit and diagnosis",
                DueDate = new DateTime(2014, 12, 12),
                State = EntityState.Added
            };

            var patient = new Patient { PatientId = patientId };
            var condition = new Condition { ConditionId = conditionId };
            var patientBill = new PatientBill 
            {
                Bill = bill,
                Condition = condition,
                Patient = patient
            };

            using (mocks.Record())
            {
                //SetupResult.For(patient.Conditions)
                //    .Return(new List<Condition>
                //    {
                //        new Condition
                //        {
                //            ConditionId = conditionId
                //        }
                //    });
                //SetupResult.For(patient.PatientId).Return(patientId);
                billRepository.Create(null);
                LastCall.Constraints(
                    Is.Matching<Bill>(x =>
                    {
                        Assert.AreEqual(bill.Amount, x.Amount);
                        Assert.AreEqual(bill.BillId, x.BillId);
                        Assert.AreEqual(bill.Details, x.Details);
                        Assert.AreEqual(bill.DueDate, x.DueDate);
                        Assert.AreEqual(bill.State, x.State);
                        return true;
                    })
                );
                
                //Expect.Call(patientRepository.Get(patientId)).Return(patient);

                patient.PatientBills.Add(null);
                LastCall.Constraints(
                    Is.Matching<PatientBill>(x =>
                    {
                        Assert.AreEqual(patientBill.Bill, x.Bill);
                        Assert.AreEqual(patientBill.Condition, x.Condition);
                        Assert.AreEqual(patientBill.Patient, x.Patient);
                        return true;
                    })
                );
                patientRepository.Update(null);
                LastCall.Constraints(
                    Is.Matching<Patient>(x =>
                    {
                        Assert.AreEqual(patient.PatientId, x.PatientId);
                        return true;
                    })
                );
            }

            using (mocks.Playback())
            {
                target.Save(bill, conditionId, patientId);
            }
        }

    }
}
