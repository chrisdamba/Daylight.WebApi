using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        public void Create(Payment payment)
        {
            throw new NotImplementedException();
        }

        public void Update(Payment payment)
        {
            throw new NotImplementedException();
        }

        public Payment Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Payment> Get(IEnumerable<Guid> ids)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Guid> List(out int totalCount, Expression<Func<Payment, bool>> criteria = null, int page = 1, int count = Int32.MaxValue)
        {
            throw new NotImplementedException();
        }
    }
}
