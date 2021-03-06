﻿
using System;
using System.Collections.Generic;
using System.Linq;
using Daylight.WebApi.Mvc.Models;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Exceptions;

namespace Daylight.WebApi.Mvc.Factories
{
    public class PatientViewFactory : IViewFactory
    {
        private readonly IPatientService patientService;

        public PatientViewFactory(IPatientService patientService)
        {
            this.patientService = patientService;
        }

        public IEnumerable<PatientViewModel> List(PatientFilter filter, string search = null, int skip = 0,
                                                  int take = int.MaxValue)
        {
            int totalCount;
            return patientService.List(out totalCount, filter, search, skip, take)
                .Select(x => new PatientViewModel(x))
                .ToArray();
        }

        public virtual PatientViewModel GetPatient(Guid patientId)
        {
            var patient = patientService.Get(patientId);
            if (patient == null)
            {
                throw new UnavailableItemException("Patient not found");
            }

            return new PatientViewModel(patient);
        }
    }
}
