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
    /// An MVC API Controller for authoring and viewing patient medications.
    /// </summary>
    [Backbone]
    public class MedicationController : ApiController
    {
        private readonly IViewFactory viewFactory;
        private readonly IItemFactory itemFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicationController"/> class.
        /// </summary>
        /// <param name="viewFactory">The patient view factory.</param>
        /// <param name="itemFactory">The patient item factory.</param>
        public MedicationController(IViewFactory viewFactory, IItemFactory itemFactory)
        {
            this.viewFactory = viewFactory;
            this.itemFactory = itemFactory;   
        }

        [System.Web.Http.AllowAnonymous]
        public IEnumerable<MedicationViewModel> Get(Guid patientId)
        {
            return viewFactory.GetPatient(patientId).Medications;
        }

        /// <summary>
        /// Returns a condition for the provided patient and condition ids.
        /// </summary>
        /// <param name="conditionId">The condition id.</param>
        /// <param name="patientId">The patient id.</param>
        /// <returns>A step.</returns>
        [System.Web.Http.AllowAnonymous]
        public MedicationViewModel Get(Guid medicationId, Guid conditionId, Guid patientId)
        {
            return viewFactory.GetMedication(medicationId, conditionId, patientId);
        }

        /// <summary>
        /// Creates the medication described by the model onto the patient id, and returns the updated model.
        /// </summary>
        /// <param name="model">The medication to create.</param>
        /// <param name="patientId">The patient to create onto.</param>
        /// <param name="conditionId">The condition identifier.</param>
        /// <returns>
        /// The updated model.
        /// </returns>
        public MedicationViewModel Post([FromBody]MedicationViewModel model, Guid patientId, Guid conditionId)
        {
            if (model == null || !ModelState.IsValid || model.Id != Guid.Empty)
            {
                throw this.BadRequestException("Medication is null or invalid");
            }

            var med = itemFactory.Save(model, patientId, conditionId);
            var medsmodel = viewFactory.GetMedication(med.MedicationId, conditionId ,patientId);
            return medsmodel;
        }

        /// <summary>
        /// Updates the medication described by the model, and returns the updated model.
        /// </summary>
        /// <param name="model">The medication to update.</param>
        /// <param name="patientId">The patient the medication is on.</param>
        /// <param name="conditionId">The condition identifier.</param>
        /// <returns>
        /// The updated model.
        /// </returns>
        public MedicationViewModel Put([FromBody]MedicationViewModel model, Guid patientId, Guid conditionId)
        {
            if (model == null || !ModelState.IsValid || model.Id == Guid.Empty)
            {
                throw this.BadRequestException("Medication is null or invalid");
            }

            var medication = itemFactory.Save(model, patientId, conditionId);
            return viewFactory.GetMedication(medication.MedicationId, conditionId, patientId);
        }

        /// <summary>
        /// Deletes the medication described by the provided patient and condition ids.
        /// </summary>
        /// <param name="conditionId">The condition id to delete.</param>
        /// <param name="patientId">The patient id.</param>
        /// <returns>A HttpStatusCode response.</returns>
        public HttpResponseMessage Delete(Guid medicationId, Guid conditionId, Guid patientId)
        {
            itemFactory.Delete(medicationId, conditionId, patientId);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
