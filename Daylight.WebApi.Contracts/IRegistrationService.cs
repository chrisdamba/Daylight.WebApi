using System;
using System.Collections.Specialized;
using System.Web.Mvc;

namespace Daylight.WebApi.Contracts
{
    /// <summary>
    /// A service handling registration concerns, supporting the workflow of creating an account in the system.
    /// </summary>
    public interface IRegistrationService
    {
        /// <summary>
        /// Returns a new view model for the provided space, using information in the provided form
        /// collection if present, or a default model if no form collection is available.
        /// </summary>
        /// <param name="form">The form collection.</param>
        /// <returns>A registration view model.</returns>
        IRegistrationViewModel Load(NameValueCollection form = null);

        /// <summary>
        /// Saves a user account for the provided registration view model, for the space provided.
        /// </summary>
        /// <param name="model">The registration view model.</param>
        /// <returns>The account user id.</returns>
        Guid Save(IRegistrationViewModel model);

        /// <summary>
        /// Validates the provided registration view model, adding any validation errors to the model
        /// state dictionary.
        /// </summary>
        /// <param name="model">The registration view model.</param>
        /// <param name="modelState">The model state dictionary.</param>
        /// <returns>True if valid, false otherwise.</returns>
        bool Validate(IRegistrationViewModel model, ModelStateDictionary modelState);
    }
}
