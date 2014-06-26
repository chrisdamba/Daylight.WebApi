using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Repositories.Data;

namespace Daylight.WebApi.Repositories
{
    public class PatientBillRepository : RepositoryBase<IDataContext, DataContext>, IPatientBillRepository
    {
        public void Create(PatientBill bill)
        {
            using (var context = CreateContext)
            {
                context.PatientBills.Add(bill);
                context.SaveChanges();
            }
        }

        public void Update(PatientBill bill)
        {
            using (var context = CreateContext)
            {
                context.Entry(bill).State = bill.State;
                context.SaveChanges();
            }
        }

        public PatientBill Get(Guid id)
        {
            using (var context = CreateContext)
            {
                return context.PatientBills.SingleOrDefault(x => (x.PatientId == id));
            }
        }

        public IEnumerable<PatientBill> Get(IEnumerable<Guid> ids)
        {
            using (var context = CreateContext)
            {
                return context.PatientBills.Where(x => ids.Contains(x.PatientId)).ToArray();
            }
        }

        public IEnumerable<Guid> List(out int totalCount, Expression<Func<PatientBill, bool>> criteria = null, int page = 1, int count = Int32.MaxValue)
        {
            using (var context = CreateContext)
            {
                // Default criteria to Everything if not set
                if (criteria == null) criteria = a => true;

                // Establish a LINQ to SQL Query
                var query = context.PatientBills.Where(criteria);

                // Execute for Total Count
                totalCount = query.Count();

                // Execute for Sub-set of requested entries
                return query.Select(a => a.BillId).Skip((page - 1) * count).Take(count).ToArray();
            }
        }
    }
}
