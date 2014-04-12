using System.Collections.Specialized;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
{
    /// <summary>
    /// A provider supporting the <see cref="IRegistrationService"/> interface for a limited set of spaces.
    /// 
    /// It's expected that a <see cref="IRegistrationService"/> will be delegating calls to registration providers
    /// as necessary, and performing common work itself.
    /// </summary>
    public interface IRegistrationProvider
    {
        /// <summary>
        /// Creates a new registration view model of whatever type this provider supports.
        /// </summary>
        /// <returns>A registration view model.</returns>
        IRegistrationViewModel Create();

        /// <summary>
        /// Creates a registration view model using the data in the provided form collection, reusing
        /// values where posted, and default values where not present.
        /// </summary>
        /// <param name="form">The posted form collection.</param>
        /// <returns>A registration view model.</returns>
        IRegistrationViewModel Load(NameValueCollection form);
    }
}
