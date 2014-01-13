using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using Daylight.WebApi.Core.Attributes;
using Daylight.WebApi.Mvc.Factories;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Api
{
    /// <summary>
    /// An MVC API Controller for authoring and viewing patient conditions.
    /// </summary>
    [Backbone]
    public class ConditionController : ApiController
    {
        private readonly IViewFactory viewFactory;
        private readonly IItemFactory itemFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="ConditionController"/> class.
        /// </summary>
        /// <param name="patientViewFactory">The playlist view model factory.</param>
        /// <param name="domainFacade">The playlists domain facade.</param>
        public ConditionController(IViewFactory patientViewFactory, IItemFactory itemFactory)
        {
            this.viewFactory = viewFactory;
            this.itemFactory = itemFactory;
        }

        /// <summary>
        /// Returns an enumerable of steps for the provided playlist id.
        /// </summary>
        /// <param name="playlistId">The playlist id.</param>
        /// <returns>All steps on the playlist.</returns>
        [System.Web.Http.AllowAnonymous]
        public IEnumerable<ConditionViewModel> Get(Guid patientId)
        {
            return viewFactory.GetPatient(patientId).Conditions;
        }

        /// <summary>
        /// Returns a condition for the provided patient and condition ids.
        /// </summary>
        /// <param name="conditionId">The condition id.</param>
        /// <param name="patientId">The patient id.</param>
        /// <returns>A step.</returns>
        [System.Web.Http.AllowAnonymous]
        public ConditionViewModel Get(Guid conditionId, Guid patientId)
        {
            return viewFactory.GetCondition(conditionId, patientId);
        }

        /// <summary>
        /// Creates the condition described by the model onto the patient id, and returns the updated model.
        /// </summary>
        /// <param name="model">The condition to create.</param>
        /// <param name="patientId">The patient to create onto.</param>
        /// <returns>The updated model.</returns>
        public ConditionViewModel Post([FromBody]ConditionViewModel model, Guid patientId)
        {
            if (model == null || !ModelState.IsValid || model.Id != Guid.Empty)
            {
                throw this.BadRequestException("Condition is null or invalid");
            }

            var condition = itemFactory.Save(model, patientId);
            return viewFactory.GetCondition(condition.ConditionId, patientId);
        }

        /// <summary>
        /// Updates the condition described by the model, and returns the updated model.
        /// </summary>
        /// <param name="model">The condition to update.</param>
        /// <param name="patientId">The patient the condition is on.</param>
        /// <returns>The updated model.</returns>
        public ConditionViewModel Put([FromBody]ConditionViewModel model, Guid patientId)
        {
            if (model == null || !ModelState.IsValid || model.Id == Guid.Empty)
            {
                throw this.BadRequestException("Condition is null or invalid");
            }

            var condition = itemFactory.Save(model, patientId);
            return viewFactory.GetCondition(condition.ConditionId, patientId);
        }

        /// <summary>
        /// Deletes the condition described by the provided patient and condition ids.
        /// </summary>
        /// <param name="conditionId">The condition id to delete.</param>
        /// <param name="patientId">The patient id.</param>
        /// <returns>A HttpStatusCode response.</returns>
        public HttpResponseMessage Delete(Guid conditionId, Guid patientId)
        {
            itemFactory.Delete(conditionId, patientId);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
