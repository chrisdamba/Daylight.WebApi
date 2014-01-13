using System;
using System.Data;
using System.Linq;
using Daylight.WebApi.Core.Exceptions;
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

        public virtual void Delete(Guid conditionId, Guid patientId)
        {
            var patient = patientService.Get(patientId);
            if (patient == null)
            {
                throw new UnavailableItemException("Patient not found");
            }
            var condition = patient.Conditions.SingleOrDefault(x => x.ConditionId == conditionId);
            if (condition == null)
            {
                throw new UnavailableItemException("Condition not found");
            }

            // Delete condition
            condition.State = EntityState.Deleted;
            foreach (var c in patient.Conditions.Where(x => x.ConditionId != conditionId))
            {
                c.State = EntityState.Modified;
            }

            patientService.Save(patient);
        }

        public virtual Patient Save(PatientViewModel model)
        {
            var patient = model.Id != Guid.Empty ? patientService.Get(model.Id) : null;
            patient = model.ToEntity(patient);

            patientService.Save(patient);
            return patient;
        }

        public virtual Condition Save(ConditionViewModel model, Guid patientId)
        {
            // Get the patient to update
            var patient = patientService.Get(patientId);

            if (patient == null)
            {
                throw new UnavailableItemException("Patient not found");
            }

            Condition condition;

            if (model.Id == Guid.Empty)
            {
                // Create condition
                condition = model.ToEntity(null);
                patient.Conditions.Add(condition);
            }
            else
            {
                condition = patient.Conditions.SingleOrDefault(x => x.ConditionId == model.Id);
                if (condition == null)
                {
                    throw new UnavailableItemException("Condition not found");
                }
                condition = model.ToEntity(condition);
            }

            patientService.Save(patient);
            return condition;

        }
    }
}
