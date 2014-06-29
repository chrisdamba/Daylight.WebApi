using System;
using System.Collections.Generic;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts.Services
{
    public interface IPatientService
    {
        Patient Get(Guid id);

        IEnumerable<Patient> List(out int totalCount, PatientFilter filter, string search, int skip = 0, int take = 100);

        void Delete(Guid id);

        void Save(Patient patient);

        event EventHandler<PatientEventArgs> BeforeSave;

        event EventHandler<PatientEventArgs> Changed;
    }
}
