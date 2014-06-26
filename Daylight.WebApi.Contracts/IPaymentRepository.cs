using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
{
    public interface IPaymentRepository
    {
        void Create(Payment payment);

        void Update(Payment payment);

        Payment Get(Guid id);

        IEnumerable<Payment> Get(IEnumerable<Guid> ids);

        IEnumerable<Guid> List(out int totalCount, Expression<Func<Payment, bool>> criteria = null, int page = 1,
                               int count = int.MaxValue);
    }
}
