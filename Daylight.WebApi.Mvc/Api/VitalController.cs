using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Daylight.WebApi.Core.Attributes;
using Daylight.WebApi.Mvc.Factories;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Api
{
    /// <summary>
    /// An MVC API Controller for authoring and viewing patient conditions.
    /// </summary>
    [Backbone]
    public class VitalController : ApiController
    {
        private readonly IViewFactory viewFactory;
        private readonly IItemFactory itemFactory;

        public VitalController(IViewFactory viewFactory, IItemFactory itemFactory)
        {
            this.viewFactory = viewFactory;
            this.itemFactory = itemFactory;
        }

        /// <summary>
        /// Returns an enumerable of steps for the provided patientId id.
        /// </summary>
        /// <param name="patientId">The patient id.</param>
        /// <returns>All conditions on the patient.</returns>
        [Core.Attributes.AllowAnonymous]
        public IEnumerable<VitalsViewModel> Get(Guid patientId)
        {
            return viewFactory.GetPatient(patientId).Vitals;
        }

        /// <summary>
        /// Returns a condition for the provided patient and condition ids.
        /// </summary>
        /// <param name="observationId">The observation identifier.</param>
        /// <param name="patientId">The patient id.</param>
        /// <returns>
        /// A vital sign model.
        /// </returns>
        [Core.Attributes.AllowAnonymous]
        public VitalsViewModel Get(Guid observationId, Guid patientId)
        {
            return viewFactory.GetVital(observationId, patientId);
        }

        /// <summary>
        /// Creates the condition described by the model onto the patient id, and returns the updated model.
        /// </summary>
        /// <param name="model">The condition to create.</param>
        /// <param name="patientId">The patient to create onto.</param>
        /// <returns>The updated model.</returns>
        public VitalsViewModel Post([FromBody]VitalsViewModel model, Guid patientId)
        {
            if (model == null || !ModelState.IsValid || model.Id != Guid.Empty)
            {
                throw this.BadRequestException("Vital is null or invalid");
            }

            var vital = itemFactory.Save(model, patientId);
            var vmodel = viewFactory.GetVital(vital.ObservationId, patientId);
            return vmodel;
        }

        /// <summary>
        /// Updates the condition described by the model, and returns the updated model.
        /// </summary>
        /// <param name="model">The condition to update.</param>
        /// <param name="patientId">The patient the condition is on.</param>
        /// <returns>The updated model.</returns>
        public VitalsViewModel Put([FromBody]VitalsViewModel model, Guid patientId)
        {
            if (model == null || !ModelState.IsValid || model.Id == Guid.Empty)
            {
                throw this.BadRequestException("Vital is null or invalid");
            }

            var vital = itemFactory.Save(model, patientId);
            return viewFactory.GetVital(vital.ObservationId, patientId);
        }

        /// <summary>
        /// Deletes the vital described by the provided patient and observation ids.
        /// </summary>
        /// <param name="observationId">The observation identifier.</param>
        /// <param name="patientId">The patient id.</param>
        /// <returns>
        /// A HttpStatusCode response.
        /// </returns>
        public HttpResponseMessage Delete(Guid observationId, Guid patientId)
        {
            itemFactory.DeleteVital(observationId, patientId);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
