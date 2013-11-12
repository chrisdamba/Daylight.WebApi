using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
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
