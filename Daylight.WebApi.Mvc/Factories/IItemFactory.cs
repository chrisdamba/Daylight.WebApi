﻿using System;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Factories
{
    public interface IItemFactory
    {
        void Delete(Guid patientId);

        void DeleteVital(Guid observationId, Guid patientId);

        void DeleteEvent(Guid eventId);

        void Delete(Guid conditionId, Guid patientId);

        void Delete(Guid medicationId, Guid conditionId, Guid patientId);

        Patient Save(PatientViewModel model);

        Vital Save(VitalsViewModel model, Guid patientId);

        Condition Save(ConditionViewModel model, Guid patientId);

        Medication Save(MedicationViewModel model, Guid patientId, Guid conditionId);

        Event Save(EventViewModel model);
    }
}