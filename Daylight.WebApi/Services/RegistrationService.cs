using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Services
{
    public class RegistrationService : IRegistrationService
    {
        private readonly ISecurityFactory securityFactory;
        private readonly IRegistrationProvider registrationProvider;

        public RegistrationService()
            :this(Injector.Get<ISecurityFactory>(), Injector.Get<IRegistrationProvider>())
        {
        }
        
        public RegistrationService(ISecurityFactory securityFactory, IRegistrationProvider registrationProvider)
        {
            this.securityFactory = securityFactory;
            this.registrationProvider = registrationProvider;
        }
        
        public IRegistrationViewModel Load(NameValueCollection form = null)
        {
            return form == null ? registrationProvider.Create() : registrationProvider.Load(form);
        }

        public Guid Save(IRegistrationViewModel model)
        {
            // Register the user
            securityFactory.CreateUser(model.Username, model.Password, model.Email, model.FirstName, model.LastName);

            var userId = securityFactory.GetUser(model.Username).UserId;
            return userId;
        }

        public bool Validate(IRegistrationViewModel model, ModelStateDictionary modelState)
        {
            var context = new ValidationContext(model, null, null);
            var results = new List<ValidationResult>();

            // NOTE: This also executes IValidatableObject.Validate, only if the data annotation attributes are valid
            var valid = Validator.TryValidateObject(model, context, results, true);

            // Add validation errors to model state
            foreach (var result in results)
            {
                modelState.AddModelError(result.MemberNames.FirstOrDefault() ?? string.Empty, result.ErrorMessage);
            }

            return valid;
        }
    }
}
