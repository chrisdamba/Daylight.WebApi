using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Services;
using MbUnit.Framework;
using Rhino.Mocks;
using Rhino.Mocks.Constraints;

namespace Daylight.WebApi.Tests.Domain.Services
{
    [TestFixture]
    public class RegistrationServiceTests
    {
        private RegistrationService target;
        private MockRepository mocks;
        private ISecurityFactory securityFactory;
        private IRegistrationProvider registrationProvider;

        [SetUp]
        public void SetUp()
        {
            mocks = new MockRepository();
            securityFactory = mocks.StrictMock<ISecurityFactory>();
            registrationProvider = mocks.StrictMock<IRegistrationProvider>();

            target = new RegistrationService(securityFactory, registrationProvider);
        }

        [Test]
        public void Load_NullForm_Creates()
        {
            var model = mocks.StrictMock<IRegistrationViewModel>();
            using (mocks.Record())
            {
                Expect.Call(registrationProvider.Create()).Return(model);
            }

            using (mocks.Playback())
            {
                var result = target.Load();
                Assert.AreSame(model, result);
            }
        }

        [Test]
        public void Load_Form_Loads()
        {
            var model = mocks.StrictMock<IRegistrationViewModel>();
            var form = new NameValueCollection();

            using (mocks.Record())
            {
                Expect.Call(registrationProvider.Load(form)).Return(model);
            }
            using (mocks.Playback())
            {
                var result = target.Load(form);
                Assert.AreSame(model, result);
            }
        }

        [Test]
        public void Save_CreatesUser_ReturnsId()
        {
            var model = mocks.StrictMock<IRegistrationViewModel>();
            User user = null;
            var id = Guid.NewGuid();

            using (mocks.Record())
            {
                SetupResult.For(model.Email).Return("user@daylight.com");
                SetupResult.For(model.Username).Return("john.smith");
                SetupResult.For(model.FirstName).Return("john");
                SetupResult.For(model.LastName).Return("smith");
                SetupResult.For(model.Password).Return("password123");
                
                Expect.Call(securityFactory.CreateUser(null, null, false))
                    .Constraints(
                        Is.Matching<User>(x =>
                        {
                            Assert.AreEqual("john.smith", x.UserName);
                            Assert.AreEqual("user@daylight.com", x.Email);
                            Assert.AreEqual("john", x.FirstName);
                            Assert.AreEqual("smith", x.LastName);
                            
                            user = x;
                            x.UserId = id;

                            return true;
                        }),
                        Is.Equal("password123"),
                        Is.Equal(false))
                    .Return(null);
            }
            using (mocks.Playback())
            {
                var result = target.Save(model);
                Assert.AreEqual(id, result);
            }
        }

        #region Validate

        [Test]
        public void Validate_InvalidProperties_ErrorsInModelState()
        {
            var model = new FakeRegistrationModel();
            var modelState = new ModelStateDictionary();

            var result = target.Validate(model, modelState);

            Assert.IsFalse(result);
            Assert.Count(1, modelState);
            Assert.ContainsKey(modelState, "FirstName");
        }

        [Test]
        public void Validate_InvalidClassAttributes_ErrorsInModelState()
        {
            var model = new FakeRegistrationModel { Username = "already.used", FirstName = "john", Email = "already.used@test.com", Password = "password" };
            var modelState = new ModelStateDictionary();

            var result = target.Validate(model, modelState);

            Assert.IsFalse(result);
            Assert.Count(1, modelState);
            Assert.ContainsKey(modelState, string.Empty);
        }

        [Test]
        public void Validate_ValidateMethodErrors_ErrorsInModelState()
        {
            var model = new FakeRegistrationModel { Username = "already.used", FirstName = "john", Email = "already.used@test.com", Password = "a" };
            var modelState = new ModelStateDictionary();

            var result = target.Validate(model, modelState);

            Assert.IsFalse(result);
            Assert.Count(1, modelState);
            Assert.ContainsKey(modelState, "Email");
        }

        [Test]
        public void Validate_Valid_NoErrors()
        {
            var model = new FakeRegistrationModel { FirstName = "john", Email = "new@test.com" };
            var modelState = new ModelStateDictionary();

            var result = target.Validate(model, modelState);

            Assert.IsTrue(result);
            Assert.IsEmpty(modelState);
        }

        #endregion
    }

    #region Classes

    public class FakeRegistrationModel : IRegistrationViewModel, IValidatableObject
    {
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Username == "already.used")
            {
                return new[] { new ValidationResult("UserName already used", new[] { "Username" }) };
            }

            return new ValidationResult[0];
        }
    }

    #endregion
}
