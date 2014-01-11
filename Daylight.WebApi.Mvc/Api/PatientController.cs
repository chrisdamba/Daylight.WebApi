using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Daylight.WebApi.Mvc.Factories;
using Daylight.WebApi.Mvc.Models;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Attributes;

namespace Daylight.WebApi.Mvc.Api
{
    [Backbone]
    public class PatientController : ApiController
    {
        private readonly IViewFactory viewFactory;
        private readonly IItemFactory itemFactory;

        public PatientController()
        {
        }

        public PatientController(IViewFactory viewFactory, IItemFactory itemFactory)
        {
            this.viewFactory = viewFactory;
            this.itemFactory = itemFactory;
        }
        
        // GET api/patients
        /// <summary>
        /// Returns an enumerable of patients optionally with skip/take values.
        /// </summary>
        /// <param name="filter">The filter to apply.</param>
        /// <param name="search">The search string to filter by.</param>
        /// <param name="skip">The number to skip.</param>
        /// <param name="take">The number to take.</param>
        /// <returns>An enumerable of patients.</returns>
        public IEnumerable<PatientViewModel> Get(PatientFilter? filter, string search = null, int skip = 0, int take = int.MaxValue)
        {
            if (skip < 0)
            {
                throw this.BadRequestException("Skip must be a non-negative value");
            }

            if (take < 0)
            {
                throw this.BadRequestException("Take must be a non-negative value");
            }
            return viewFactory.List(filter ?? PatientFilter.Default, search, skip, take);
        }

        // GET api/patients
        public IEnumerable<PatientViewModel> Get(string search = null, int skip = 0, int take = int.MaxValue)
        {
            return Get(null, search, skip, take);
        }

         // GET api/patients/{patientId}
        public PatientViewModel Get(Guid patientId)
        {
            return viewFactory.GetPatient(patientId);
        }

        // POST api/patients
        public PatientViewModel Post([FromBody]PatientViewModel model)
        {
            var returnId = Guid.Empty;
            if (model != null && ModelState.IsValid && model.Id == Guid.Empty)
            {
                returnId = itemFactory.Save(model).PatientId;
            }
            else
            {
                throw this.BadRequestException("Patient is null or invalid");
            }

            return viewFactory.GetPatient(returnId);
        }

        // PUT api/patients
        public PatientViewModel Put([FromBody]PatientViewModel model)
        {
            if (model == null || !ModelState.IsValid || model.Id == Guid.Empty)
            {
                throw this.BadRequestException("Patient is null or invalid");
            }

            var patient = itemFactory.Save(model);
            return viewFactory.GetPatient(patient.PatientId);
        }

        // DELETE api/patients/{patientId}
        public HttpResponseMessage Delete(Guid patientId)
        {
            itemFactory.Delete(patientId);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}