using System;
using System.Threading;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Contracts.Providers;
using Daylight.WebApi.Providers;
using Daylight.WebApi.Repositories;
using Daylight.WebApi.Repositories.Data;
using Daylight.WebApi.Security.Factories;
using Daylight.WebApi.Services;
using Microsoft.Practices.Unity;

namespace Daylight.WebApi.Core.IoC
{
    /// <summary>
    /// The IoC resolver for castle
    /// </summary>
    public class UnityResolver : IResolver
    {
        /// <summary>
        /// The windsor castle configuration containers (lazy and explicitly set)
        /// </summary>
        private readonly static Lazy<IUnityContainer> lazyContainer = new Lazy<IUnityContainer>(CreateContainer, LazyThreadSafetyMode.PublicationOnly);
        private static IUnityContainer container;

        /// <summary>
        /// Gets or sets the container, which is lazily initialized if not explicitly set.
        /// </summary>
        public static IUnityContainer Container
        {
            get { return container ?? lazyContainer.Value; }
            set { container = value; }
        }

        /// <summary>
        /// Gets or sets the config file path.
        /// </summary>
        /// <value>The config file.</value>
        /// <remarks>
        /// The path to the configuration file to load.  If this is
        /// not set then config will be loaded from application domain config,
        /// for example web.config.
        /// </remarks>
        public static string ConfigFilePath { get; set; }

        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <typeparam name="T">The type of the service to get</typeparam>
        /// <returns>The service instance</returns>
        public T Get<T>()
        {
            return Container.Resolve<T>();
        }

        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <typeparam name="T">The type of the service to get</typeparam>
        /// <param name="key">The key.</param>
        /// <returns>The service instance</returns>
        public T Get<T>(string key)
        {
            return Container.Resolve<T>(key);
        }

        /// <summary>
        /// Gets an instance.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns>
        /// The service instance
        /// </returns>
        public object Get(Type type)
        {
            return Container.Resolve(type);
        }

        /// <summary>
        /// Releases the specified instance.
        /// </summary>
        /// <param name="instance">The instance.</param>
        public void Release(object instance)
        {
            
        }

        /// <summary>
        /// Determines whether Resolver has a component of type registered.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns>
        ///   <c>true</c> if the Resolver has the type registered; otherwise, <c>false</c>.
        /// </returns>
        public bool Has(Type type)
        {
            try
            {
                var obj = Container.Resolve(type);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Ensures the container.
        /// </summary>
        private static IUnityContainer CreateContainer()
        {
            container = new UnityContainer();

            container.RegisterType<IDataContext, DataContext>();
            container.RegisterType<IPatientRepository, PatientRepository>();
            container.RegisterType<IPatientService, PatientService>();
            container.RegisterType<ISecurityFactory, DataContextSecurityFactory>();
            container.RegisterType<IAuthenticationProvider, FormsAuthenticationProvider>();
            container.RegisterType<ILoginService, LoginService>();
            container.RegisterType<IUser, User>();
            container.RegisterType<IRole, Role>();

            return container;
        }
    }
}