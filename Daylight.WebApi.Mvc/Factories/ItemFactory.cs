using System;
using System.Data;
using System.Linq;
using Daylight.WebApi.Contracts.Services;
using Daylight.WebApi.Core.Exceptions;
using Daylight.WebApi.Mvc.Models;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Factories
{
    public class ItemFactory : IItemFactory
    {
        private readonly IPatientService patientService;
        private readonly IEventService eventService;

        public ItemFactory(IPatientService patientService, IEventService eventService)
        {
            this.patientService = patientService;
            this.eventService = eventService;
        }

        public virtual void Delete(Guid patientId)
        {
            patientService.Delete(patientId);
        }

        public void DeleteVital(Guid observationId, Guid patientId)
        {
            var patient = patientService.Get(patientId);
            if (patient == null)
            {
                throw new UnavailableItemException("Patient not found");
            }
            var vital = patient.Vitals.SingleOrDefault(x => x.ObservationId == observationId);
            if (vital == null)
            {
                throw new UnavailableItemException("Vital not found");
            }

            // Delete condition
            vital.State = EntityState.Deleted;
            foreach (var v in patient.Vitals.Where(x => x.ObservationId != observationId))
            {
                v.State = EntityState.Modified;
            }

            patientService.Save(patient);
        }

        public void DeleteEvent(Guid eventId)
        {
            eventService.Delete(eventId);
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

            // Delete any underlying meds
            var medications = condition.Medications;
            if (medications.Any())
            {
                foreach (var med in medications)
                {
                    med.State = EntityState.Modified;
                    med.FinishedAt = DateTime.UtcNow;
                }
            }

            // Delete condition
            condition.State = EntityState.Modified;
            condition.FinishedAt = DateTime.UtcNow;
            foreach (var c in patient.Conditions.Where(x => x.ConditionId != conditionId))
            {
                c.State = EntityState.Modified;
            }

            patientService.Save(patient);
        }

        public virtual void Delete(Guid medicationId, Guid conditionId, Guid patientId)
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
           
            var medication = condition.Medications.SingleOrDefault(x => x.MedicationId == medicationId);
            if (medication == null)
            {
                throw new UnavailableItemException("Medication not found");
            }

            // Delete medication
            medication.State = EntityState.Deleted;
            foreach (var c in condition.Medications.Where(x => x.MedicationId != medicationId))
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

        public Vital Save(VitalsViewModel model, Guid patientId)
        {
            // Get the patient to update
            var patient = patientService.Get(patientId);

            if (patient == null)
            {
                throw new UnavailableItemException("Patient not found");
            }

            Vital vital = null;

            if (model.Id == Guid.Empty)
            {
                // Create vital
                vital = model.ToEntity(null);
                patient.Vitals.Add(vital);
            }
            else
            {
                vital = patient.Vitals.SingleOrDefault(x => x.ObservationId == model.Id);
                if (vital == null)
                {
                    throw new UnavailableItemException("Vital not found");
                }
                vital = model.ToEntity(vital);
            }

            patientService.Save(patient);
            return vital;
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

        public Medication Save(MedicationViewModel model, Guid patientId, Guid conditionId)
        {
            // Get the patient to update
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

            Medication medication;

            if (model.Id == Guid.Empty)
            {
                // Create medication
                medication = model.ToEntity(null);
                condition.Medications.Add(medication);
            }
            else
            {
                // Update the medication
                medication = condition.Medications.SingleOrDefault(x => x.MedicationId == model.Id);
                if (medication == null)
                {
                    throw new UnavailableItemException("Medication not found");
                }
                medication = model.ToEntity(medication);
            }

            patientService.Save(patient);
            return medication;
        }

        public Event Save(EventViewModel model)
        {
            var calendarEvent = model.Id != Guid.Empty ? eventService.Get(model.Id) : null;
            calendarEvent = model.ToEntity(calendarEvent);

            eventService.Save(calendarEvent);
            return calendarEvent;
        }
    }
}
