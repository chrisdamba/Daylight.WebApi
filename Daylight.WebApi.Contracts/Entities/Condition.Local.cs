using System.Data;


namespace Daylight.WebApi.Contracts.Entities
{
    public partial class Condition
    {
        private EntityState state = EntityState.Unchanged;
        public EntityState State { get { return state; } set { state = value; } }
    }
}
