using System.Data.Entity;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Repositories.Data
{
    public class DataContext : DaylightDataContext, IDataContext
    {
        public DataContext()
            : base(DataContextUtility.CreateEdmxConnectionString("Repositories.Data.Model"))
        {
        }
        
        public IDbSet<Patient> Patients
        {
            get { return base.Patients; }
        }

        public IDbSet<Address> Addresses
        {
            get { return base.Addresses; }
        }

        public IDbSet<Name> Names
        {
            get { return base.Names; }
        }

        public IDbSet<Relationship> Relationships
        {
            get { return base.Relationships; }
        }

        public IDbSet<Telecom> Telecoms
        {
            get { return base.Telecoms; }
        }
    }
}
