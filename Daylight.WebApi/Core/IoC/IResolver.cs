using System;

namespace Daylight.WebApi.Core.IoC
{
    /// <summary>
    /// A resolver supporting the IoC (dependency injection) class.
    /// </summary>
    public interface IResolver
    {
        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <typeparam name="T">The type of the service to get</typeparam>
        /// <returns>
        /// The service instance
        /// </returns>
        T Get<T>();

        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <typeparam name="T">The type of the service to get</typeparam>
        /// <param name="key">The key.</param>
        /// <returns>
        /// The service instance
        /// </returns>
        T Get<T>(string key);

        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns>
        /// The service instance
        /// </returns>
        object Get(Type type);

        /// <summary>
        /// Releases the specified instance.
        /// </summary>
        /// <param name="instance">The instance.</param>
        void Release(object instance);

        /// <summary>
        /// Determines whether Resolver has a component of type registered.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns>
        ///   <c>true</c> if the Resolver has the type registered; otherwise, <c>false</c>.
        /// </returns>
        bool Has(Type type);
    }
}