using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Core.Linq;
using Daylight.WebApi.Repositories.Data;

namespace Daylight.WebApi.Repositories
{
    public class PatientRepository : RepositoryBase<IDataContext, DataContext>, IPatientRepository
    {
        public virtual void Create(Patient patient)
        {
            using (var context = CreateContext)
            {
                patient.DateBecamePatient = DateTime.Now;

                if (patient.PatientId == Guid.Empty)
                {
                    patient.PatientId = Guid.NewGuid();
                }

                // Assign condition id, as it will be empty
                foreach (var condition in patient.Conditions)
                {
                    condition.ConditionId = Guid.NewGuid();
                    condition.StartedAt = DateTime.Now;
                }

                // Assign medication id, as it will be empty
                foreach (var medication in patient.Medications)
                {
                    medication.MedicationId = Guid.NewGuid();
                    medication.StartedAt = DateTime.Now;
                }

               
                context.Patients.Add(patient);
                context.SaveChanges();
            }
        }

        public virtual void Update(Patient patient)
        {
            using (var context = CreateContext)
            {
                patient.State = EntityState.Modified;

                // Assign condition id, as it will be empty
                foreach (var condition in patient.Conditions)
                {
                    condition.ConditionId = condition.ConditionId == Guid.Empty ? Guid.NewGuid() : condition.ConditionId;
                }

                // Assign medication id, as it will be empty
                foreach (var medication in patient.Medications)
                {
                    medication.MedicationId = medication.ConditionId == Guid.Empty ? Guid.NewGuid() : medication.MedicationId;
                }
                
                // Update the entities in the context
                var entries = patient.Conditions.Cast<IStateEntity>()
                                     .Union(new IStateEntity[] { patient })
                                     .ToArray();
                foreach (var entry in entries)
                {
                    context.Entry(entry).State = entry.State;
                }

                // Update the entities in the context
                var meds = patient.Medications.Cast<IStateEntity>()
                                     .Union(new IStateEntity[] { patient })
                                     .ToArray();
                foreach (var med in meds)
                {
                    context.Entry(med).State = med.State;
                }
                
                context.SaveChanges();
            }
        }

        public virtual Patient Get(Guid id)
        {
            using (var context = CreateContext)
            {
                return context.Patients
                    .Include(Lambda.Property<Patient>(x => x.Conditions))
                    .Include(Lambda.Property<Patient>(x => x.Medications))    
                    .SingleOrDefault(x => x.PatientId == id);
            }
        }

        public virtual IEnumerable<Patient> Get(IEnumerable<Guid> ids)
        {
            using (var context = CreateContext)
            {
                return context.Patients
                    .Include(Lambda.Property<Patient>(x => x.Conditions))
                    .Include(Lambda.Property<Patient>(x => x.Medications)) 
                    .Where(x => ids.Contains(x.PatientId) && !x.IsDeleted).ToArray();
            }
        }

        public IEnumerable<Guid> List(out int totalCount, Expression<Func<Patient, bool>> criteria = null, int page = 1, int count = int.MaxValue)
        {
            using (var context = CreateContext)
            {
                // Default criteria to Everything if not set
                if (criteria == null) criteria = a => true;

                // Establish a LINQ to SQL Query
                var query = context.Patients.Where(a => !a.IsDeleted).Where(criteria).OrderByDescending(a => a.DateBecamePatient);

                // Execute for Total Count
                totalCount = query.Count();

                // Execute for Sub-set of requested entries
                return query.Select(a => a.PatientId).Skip((page - 1) * count).Take(count).ToArray();
            }
        }
    }
}
