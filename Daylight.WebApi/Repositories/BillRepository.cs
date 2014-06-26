using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Repositories.Data;

namespace Daylight.WebApi.Repositories
{
    public class BillRepository : RepositoryBase<IDataContext, DataContext>, IBillRepository
    {
        /// <summary>
        /// Creates the specified bill.
        /// </summary>
        /// <param name="bill">The bill.</param>
        public void Create(Bill bill)
        {
            using (var context = CreateContext)
            {
                if (bill.BillId == Guid.Empty)
                {
                    bill.BillId = Guid.NewGuid();
                }

                context.Bills.Add(bill);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Updates the specified bill.
        /// </summary>
        /// <param name="bill">The bill.</param>
        public void Update(Bill bill)
        {
            using (var context = CreateContext)
            {
                bill.BillId = bill.BillId == Guid.Empty ? Guid.NewGuid() : bill.BillId;
                context.Entry(bill).State = bill.State;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Gets the specified bill.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The bill</returns>
        public Bill Get(Guid id)
        {
            using (var context = CreateContext)
            {
                return context.Bills.SingleOrDefault(x => x.BillId == id);
            }
        }

        /// <summary>
        /// Gets the specified ids.
        /// </summary>
        /// <param name="ids">The ids.</param>
        /// <returns></returns>
        public IEnumerable<Bill> Get(IEnumerable<Guid> ids)
        {
            using (var context = CreateContext)
            {
                return context.Bills.Where(x => ids.Contains(x.BillId)).ToArray();
            }
        }

        /// <summary>
        /// Lists the specified total count.
        /// </summary>
        /// <param name="totalCount">The total count.</param>
        /// <param name="criteria">The criteria.</param>
        /// <param name="page">The page.</param>
        /// <param name="count">The count.</param>
        /// <returns></returns>
        public IEnumerable<Guid> List(out int totalCount, Expression<Func<Bill, bool>> criteria = null, int page = 1, int count = Int32.MaxValue)
        {
            using (var context = CreateContext)
            {
                // Default criteria to Everything if not set
                if (criteria == null) criteria = a => true;

                // Establish a LINQ to SQL Query
                var query = context.Bills.Where(criteria).OrderByDescending(a => a.DueDate);

                // Execute for Total Count
                totalCount = query.Count();

                // Execute for Sub-set of requested entries
                return query.Select(a => a.BillId).Skip((page - 1) * count).Take(count).ToArray();
            }
        }
    }
    
}
