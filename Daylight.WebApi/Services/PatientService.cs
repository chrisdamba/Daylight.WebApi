using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Objects.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Contracts.Services;
using Daylight.WebApi.Repositories;

namespace Daylight.WebApi.Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository patientRepository;

        public PatientService(IPatientRepository patientRepository)
        {
            this.patientRepository = patientRepository;
        }

        public Patient Get(Guid id)
        {
            return patientRepository.Get(id);
        }

        public IEnumerable<Patient> List(out int totalCount, PatientFilter filter, string search, int skip = 0, int take = 100)
        {
            int page = (skip / take) + 1;

            Expression<Func<Patient, bool>> query = null;

            var today = DateTime.Now;
            switch (filter)
            {
                case PatientFilter.Deceased:
                    query = x => x.IsDeleted;
                    break;
                case PatientFilter.Removed:
                    query = x => x.IsDeleted;
                    break;
                case PatientFilter.Recent:
                    query = x => SqlFunctions.DateAdd("day", 7, x.DateBecamePatient) > today;
                    break;
                case PatientFilter.Adults:
                    query = x => SqlFunctions.DateAdd("year", 18, x.DateOfBirth) < today;
                    break;
                case PatientFilter.Children:
                    query = x => SqlFunctions.DateAdd("year", 18, x.DateOfBirth) > today;
                    break;
                default:
                    query = x => !x.IsDeleted;
                    break;
            }
            if (!string.IsNullOrEmpty(search))
                query = x => (x.FirstName.Contains(search) || x.LastName.Contains(search) || x.Address.Contains(search) || x.Email.Contains(search) && !x.IsDeleted);
            var results = patientRepository.List(out totalCount, query, page, take);
            return totalCount == 0 ? new Patient[0] : Get(results);
        }
        
        public IEnumerable<Patient> Get(IEnumerable<Guid> ids)
        {
            return patientRepository.Get(ids);
        }

        public void Delete(Guid id)
        {
            var patient = Get(id);
            if (patient != null)
            {
                patient.IsDeleted = true;
                patientRepository.Update(patient);

                RaiseChanged(id);
            }
        }

        public void Save(Patient patient)
        {
            if (patient.PatientId == Guid.Empty)
            {
                patient.PatientId = Guid.NewGuid();
                patient.State = EntityState.Added;
            }
            
            RaiseBeforeSave(patient);

            AuditAction action;
            if (patient.State == EntityState.Added)
            {
                patientRepository.Create(patient);
                action = AuditAction.Created;
            }
            else
            {
                patientRepository.Update(patient);
                action = AuditAction.Updated;
            }

            RaiseChanged(patient.PatientId, action == AuditAction.Created);
        }

        public event EventHandler<PatientEventArgs> BeforeSave;
        public event EventHandler<PatientEventArgs> Changed;

        /// <summary>
        /// Dispatches the BeforeSave event to any registered listeners.
        /// </summary>
        /// <param name="patient">The patient entity.</param>
        private void RaiseBeforeSave(Patient patient)
        {
            if (BeforeSave != null)
            {
                var e = new PatientEventArgs(patient);
                BeforeSave(this, e);
            }
        }

       /// <summary>
        /// Raises the changed event.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <param name="created">if set to <c>true</c> [created].</param>
        private void RaiseChanged(Guid id, bool created = false)
        {
            if (Changed != null)
            {
                Changed(this, new PatientEventArgs(id) { Created = created });
            }
        }
    }
}
