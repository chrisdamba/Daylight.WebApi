using System;
using System.Collections.Generic;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Factories
{
    /// <summary>
    /// Describes a View Factory for Patients
    /// </summary>
    public interface IViewFactory
    {
        PatientViewModel GetPatient(Guid patientId);

        IEnumerable<PatientViewModel> List(PatientFilter filter, string search = null, int skip = 0,
                                           int take = int.MaxValue);

        ConditionViewModel GetCondition(Guid conditionId, Guid patientId);

        MedicationViewModel GetMedication(Guid medicationId, Guid conditionId, Guid patientId);

        VitalsViewModel GetVital(Guid observationId, Guid patientId);
    }
}