using System;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Repositories;
using Daylight.WebApi.Repositories.Data;
using MbUnit.Framework;
using Rhino.Mocks;

namespace Daylight.WebApi.Tests.Domain.Repositories
{
    [TestFixture]
    public class PatientRepositoryTests
    {
        public PatientRepository target;
        public MockRepository mocks;

        private IDataContext dataContext;

        [SetUp]
        public void SetUp()
        {
            mocks = new MockRepository();

            dataContext = mocks.StrictMock<IDataContext>();

            target = new PatientRepository();
        }

        [Test]
        public void Create_AddsEntity()
        {
            var patients = new FakeDbSet<Patient>();
            var entity = new Patient();

            using (mocks.Record())
            {
                SetupResult.For(dataContext.Patients).Return(patients);
                Expect.Call(dataContext.SaveChanges()).Return(1);
                Expect.Call(dataContext.Dispose);
            }

            using (mocks.Playback())
            {
                target.Create(entity);

                Assert.AreNotEqual(Guid.Empty, entity.PatientId);
                Assert.AreApproximatelyEqual(DateTime.Now, entity.DateBecamePatient, TimeSpan.FromSeconds(1));
            }
        }
    }
}
