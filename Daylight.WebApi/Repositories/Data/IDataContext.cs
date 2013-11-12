using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Repositories.Data
{
    /// <summary>
    /// The interface for the patients data context, to allow dependency injection and proxies.
    /// </summary>
    public interface IDataContext : IDisposable
    {
        IDbSet<Patient> Patients { get; }

        IDbSet<Address> Addresses { get; }

        IDbSet<Name> Names { get; }

        IDbSet<Relationship> Relationships { get; }

        IDbSet<Telecom> Telecoms { get; }
        
        DbEntityEntry Entry(object entity);
        
        int SaveChanges();
    }
}
