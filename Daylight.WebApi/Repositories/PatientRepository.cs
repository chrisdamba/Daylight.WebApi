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

                context.Patients.Add(patient);
                context.SaveChanges();
            }
        }

        public virtual void Update(Patient patient)
        {
            using (var context = CreateContext)
            {
                patient.State = EntityState.Modified;

                // Sets the primary and foreign keys for any associated entitys which are missing them
                foreach (var address in patient.Addresses)
                {
                    address.AddressId = address.AddressId == Guid.Empty ? Guid.NewGuid() : address.AddressId;
                    address.PatientId = patient.PatientId;
                }

                foreach (var name in patient.Names)
                {
                    name.Id = name.Id == Guid.Empty ? Guid.NewGuid() : name.Id;
                    name.PatientId = patient.PatientId;
                }

                foreach (var relationship in patient.Relationships)
                {
                    relationship.Id = relationship.Id == Guid.Empty ? Guid.NewGuid() : relationship.Id;
                    relationship.PatientId = patient.PatientId;
                }

                foreach (var telecom in patient.Telecoms)
                {
                    telecom.Id = telecom.Id == Guid.Empty ? Guid.NewGuid() : telecom.Id;
                    telecom.PatientId = patient.PatientId;
                }

                // Updates the entities in the context
                var entries = patient.Names.Cast<IStateEntity>()
                                .Union(new IStateEntity[] { patient })
                                .Union(patient.Addresses.Cast<IStateEntity>()
                                        .Union(new IStateEntity[] { patient }))
                                .Union(patient.Relationships.Cast<IStateEntity>()
                                        .Union(new IStateEntity[] { patient }))
                                .Union(patient.Telecoms.Cast<IStateEntity>()
                                        .Union(new IStateEntity[] { patient }))
                                .ToArray();

                foreach (var entry in entries)
                {
                    context.Entry(entry).State = entry.State;
                }
                context.SaveChanges();
            }
        }

        public virtual Patient Get(Guid id)
        {
            using (var context = CreateContext)
            {
                return context.Patients
                    .Include(Lambda.Property<Patient>(x => x.Names))
                    .Include(Lambda.Property<Patient>(x => x.Addresses))
                    .Include(Lambda.Property<Patient>(x => x.Relationships))
                    .Include(Lambda.Property<Patient>(x => x.Telecoms))
                    .SingleOrDefault(x => x.PatientId == id);
            }
        }

        public virtual IEnumerable<Patient> Get(IEnumerable<Guid> ids)
        {
            using (var context = CreateContext)
            {
                return context.Patients
                    .Include(Lambda.Property<Patient>(x => x.Names))
                    .Include(Lambda.Property<Patient>(x => x.Addresses))
                    .Include(Lambda.Property<Patient>(x => x.Relationships))
                    .Include(Lambda.Property<Patient>(x => x.Telecoms))
                    .Where(x => ids.Contains(x.PatientId)).ToArray();
            }
        }

        public IEnumerable<Guid> List(out int totalCount, Expression<Func<Patient, bool>> criteria = null, int page = 1, int count = int.MaxValue)
        {
            using (var context = CreateContext)
            {
                // Default criteria to Everything if not set
                if (criteria == null) criteria = a => true;

                // Establish a LINQ to SQL Query
                var query = context.Patients.Where(a => !a.IsDeleted).Where(criteria).OrderBy(a => a.DateBecamePatient);

                // Execute for Total Count
                totalCount = query.Count();

                // Execute for Sub-set of requested entries
                return query.Select(a => a.PatientId).Skip((page - 1) * count).Take(count).ToArray();
            }
        }
    }
}
