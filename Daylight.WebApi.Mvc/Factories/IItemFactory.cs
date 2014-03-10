using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Factories
{
    public interface IItemFactory
    {
        void Delete(Guid patientId);

        void Delete(Guid conditionId, Guid patientId);

        void Delete(Guid medicationId, Guid conditionId, Guid patientId);

        Patient Save(PatientViewModel model);

        Condition Save(ConditionViewModel model, Guid patientId);

        Medication Save(MedicationViewModel model, Guid patientId, Guid conditionId);
    }
}