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
    }
}
