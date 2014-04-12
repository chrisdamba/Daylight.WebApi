using System.Collections.Specialized;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Providers;
using Daylight.WebApi.Security.Models;
using MbUnit.Framework;
using Rhino.Mocks;

namespace Daylight.WebApi.Tests.Domain.Providers
{
    [TestFixture]
    public class RegistrationProviderTests
    {
        private RegistrationProvider target;
        
        [SetUp]
        public void SetUp()
        {
            target = new RegistrationProvider();
        }

        [Test]
        public void Create_IsDefaultModel()
        {
            var result = target.Create();

            Assert.IsInstanceOfType<RegistrationViewModel>(result);
            Assert.IsNull(result.Email);
        }

        [Test]
        public void Load_EmptyForm_DefaultValues()
        {
            var form = new NameValueCollection();
            var result = target.Load(form);

            Assert.IsInstanceOfType<RegistrationViewModel>(result);
            var model = (RegistrationViewModel)result;

            Assert.IsNull(model.Email);
            Assert.IsNull(model.FirstName);
            Assert.IsNull(model.LastName);
            Assert.IsNull(model.Password);
        }

        [Test]
        public void Load_CompleteForm_LoadsValues()
        {
            var form = new NameValueCollection
            {
                {"Email", "user@daylight.com"},
                {"FirstName", "john"},
                {"LastName", "smith"},
                {"Password", "password123"}
            };

            var result = target.Load(form);

            Assert.IsInstanceOfType<RegistrationViewModel>(result);
            var model = (RegistrationViewModel)result;

            Assert.AreEqual(model.Email, "user@mls.com");
            Assert.AreEqual(model.FirstName, "john");
            Assert.AreEqual(model.LastName, "smith");
            Assert.AreEqual(model.Password, "password123");
        }
    }
}
