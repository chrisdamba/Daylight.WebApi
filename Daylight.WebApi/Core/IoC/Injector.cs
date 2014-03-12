using System;

namespace Daylight.WebApi.Core.IoC
{
    /// <summary>
    /// The Injector (dependency injection) static class.
    /// </summary>
    public class Injector
    {
        /// <summary>
        /// The resolver to use for IoC
        /// </summary>
        private static IResolver resolver;

        /// <summary>
        /// Gets or sets the resolver.
        /// </summary>
        /// <value>
        /// The resolver.
        /// </value>
        public static IResolver Resolver
        {
            get { return resolver ?? (resolver = new UnityResolver()); }
            set { resolver = value; }
        }

        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <typeparam name="T">The type of the instance.</typeparam>
        /// <returns>The instance.</returns>
        public static T Get<T>()
        {
            return Resolver.Get<T>();
        }

        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <typeparam name="T">The type of the instance.</typeparam>
        /// <param name="key">The key.</param>
        /// <returns>The instance.</returns>
        public static T Get<T>(string key)
        {
            return Resolver.Get<T>(key);
        }

        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <param name="type">The type of the instance.</param>
        /// <returns>The instance.</returns>
        public static object Get(Type type)
        {
            return Resolver.Get(type);
        }

        /// <summary>
        /// Determines whether Resolver has a component of type registered.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns>
        ///   <c>true</c> if the Resolver has the type registered; otherwise, <c>false</c>.
        /// </returns>
        public static bool Has(Type type)
        {
            return Resolver.Has(type);
        }

        /// <summary>
        /// Releases the specified instance.
        /// </summary>
        /// <param name="instance">The instance.</param>
        public static void Release(object instance)
        {
            Resolver.Release(instance);
        }
    }
}
