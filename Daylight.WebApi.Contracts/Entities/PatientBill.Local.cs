using System.Data;

namespace Daylight.WebApi.Contracts.Entities
{
    public partial class PatientBill
    {
        private EntityState state = EntityState.Unchanged;
        public EntityState State { get { return state; } set { state = value; } }
    }
}
