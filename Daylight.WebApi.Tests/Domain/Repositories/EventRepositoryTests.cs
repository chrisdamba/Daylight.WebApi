using System;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Repositories;
using Daylight.WebApi.Repositories.Data;
using MbUnit.Framework;
using Rhino.Mocks;

namespace Daylight.WebApi.Tests.Domain.Repositories
{
    [TestFixture]
    public class EventRepositoryTests
    {
        private EventRepository target;
        private MockRepository mocks;

        private IDataContext dataContext;

        [SetUp]
        public void SetUp()
        {
            mocks = new MockRepository();

            dataContext = mocks.StrictMock<IDataContext>();

            target = new EventRepository();
        }

        [Test]
        public void Create_AddsEntity()
        {
            var events = new FakeDbSet<Event>();
            var entity = new Event();

            using (mocks.Record())
            {
                SetupResult.For(dataContext.Events).Return(events);
                Expect.Call(dataContext.SaveChanges()).Return(1);
                Expect.Call(dataContext.Dispose);
            }

            using (mocks.Playback())
            {
                target.Create(entity);

                Assert.AreNotEqual(Guid.Empty, entity.EventId);
                Assert.AreApproximatelyEqual(DateTime.Now, entity.Start, TimeSpan.FromSeconds(1));
            }
        }
    }
}
