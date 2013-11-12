using System;
using Daylight.WebApi.Mvc.Models;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Factories
{
    public class ItemFactory : IItemFactory
    {
        private readonly IPatientService patientService;

        public ItemFactory(IPatientService patientService)
        {
            this.patientService = patientService;
        }

        public virtual void Delete(Guid patientId)
        {
            patientService.Delete(patientId);
        }

        public virtual Patient Save(PatientViewModel model)
        {
            var patient = model.Id != Guid.Empty ? patientService.Get(model.Id) : null;
            patient = model.ToEntity(patient);

            patientService.Save(patient);
            return patient;
        }
    }
}
