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
    /// <summary>
    /// A repository which manages patient entities.
    /// </summary>
    public class PatientRepository : RepositoryBase<IDataContext, DataContext>, IPatientRepository
    {
        /// <summary>
        /// Creates the specified patient.
        /// </summary>
        /// <param name="patient">The patient.</param>
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

                    if (condition.Medications == null) continue;

                    // Assign medication id, as it will be empty
                    foreach (var medication in condition.Medications)
                    {
                        medication.MedicationId = Guid.NewGuid();
                        medication.StartedAt = DateTime.Now;
                        medication.ConditionId = condition.ConditionId;
                    }

                }

                // Assign observation ID for vitals
                foreach (var vital in patient.Vitals)
                {
                    vital.ObservationId = Guid.NewGuid();
                    vital.DateRecorded = DateTime.Now;
                }
                
                context.Patients.Add(patient);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Updates an existing patient entity in the database.
        /// </summary>
        /// <param name="patient">The patient.</param>
        public virtual void Update(Patient patient)
        {
            using (var context = CreateContext)
            {
                patient.State = EntityState.Modified;

                // Assign condition id, as it will be empty
                foreach (var condition in patient.Conditions)
                {
                    condition.ConditionId = condition.ConditionId == Guid.Empty ? Guid.NewGuid() : condition.ConditionId;
                    condition.PatientId = patient.PatientId;

                    if (condition.Medications == null) continue;
                    // Assign medication id, as it will be empty
                    foreach (var medication in condition.Medications)
                    {
                        medication.MedicationId = medication.MedicationId == Guid.Empty ? Guid.NewGuid() : medication.MedicationId;
                        medication.ConditionId = medication.ConditionId;
                        if (medication.State == EntityState.Deleted)
                        {
                            medication.State = EntityState.Deleted;
                        }
                    }
                }

                foreach (var vital in patient.Vitals)
                {
                    vital.ObservationId = vital.ObservationId == Guid.Empty ? Guid.NewGuid() : vital.ObservationId;
                    vital.PatientId = patient.PatientId;
                }

                
                // Update the entities in the context
                var entries = patient.Vitals.Cast<IStateEntity>()
                                     .Union(patient.Conditions)
                                     .Union(patient.Conditions.SelectMany(x => x.Medications.Cast<IStateEntity>()))
                                     .Union(new IStateEntity[] { patient })
                                     .ToArray();
                foreach (var entry in entries)
                {
                    context.Entry(entry).State = entry.State;
                }
                
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Gets the patient entity with the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public virtual Patient Get(Guid id)
        {
            using (var context = CreateContext)
            {
                return context.Patients
                    .Include(Lambda.Property<Patient>(x => x.Vitals))
                    .Include(Lambda.Property<Patient>(x => x.Conditions))
                    .Include(string.Format("{0}.{1}", Lambda.Property<Patient>(x => x.Conditions), Lambda.Property<Condition>(x => x.Medications)))
                    .SingleOrDefault(x => x.PatientId == id);
            }
        }

        /// <summary>
        /// Gets a list of patient entities with the specified ids.
        /// </summary>
        /// <param name="ids">The ids.</param>
        /// <returns></returns>
        public virtual IEnumerable<Patient> Get(IEnumerable<Guid> ids)
        {
            using (var context = CreateContext)
            {
                return context.Patients
                    .Include(Lambda.Property<Patient>(x => x.Vitals))
                    .Include(Lambda.Property<Patient>(x => x.Conditions))
                    .Include(string.Format("{0}.{1}", Lambda.Property<Patient>(x => x.Conditions), Lambda.Property<Condition>(x => x.Medications)))
                    .Where(x => ids.Contains(x.PatientId) && !x.IsDeleted).ToArray();
            }
        }

        /// <summary>
        /// Lists patient entities with the specified total count as output.
        /// </summary>
        /// <param name="totalCount">The total count.</param>
        /// <param name="criteria">The criteria.</param>
        /// <param name="page">The page.</param>
        /// <param name="count">The count.</param>
        /// <returns></returns>
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
