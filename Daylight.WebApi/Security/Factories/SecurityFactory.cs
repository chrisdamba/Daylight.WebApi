using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Security.Factories
{
    /// <summary>
    /// The security factory singleton
    /// </summary>
    public class SecurityFactory
    {
        #region singleton pattern
        
        /// <summary>
        /// The singleton instance of the security methodFactory
        /// </summary>
        private static ISecurityFactory _current;

        /// <summary>
        /// Gets the current instance of the methodFactory
        /// </summary>
        /// <value>The current.</value>
        public static ISecurityFactory Current
        {
            get { return _current ?? (_current = Injector.Get<ISecurityFactory>()); }
        }
        
        #endregion
    }
}
