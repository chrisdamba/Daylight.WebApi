
using System.Web.Http;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Mvc.Factories;
using Daylight.WebApi.Repositories;
using Daylight.WebApi.Repositories.Data;
using Daylight.WebApi.Services;
using Microsoft.Practices.Unity;

namespace Daylight.WebApi.Mvc
{
    public static class Bootstrapper
    {
        public static void Initialise()
        {
            var container = BuildUnityContainer();

            //DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            // register dependency resolver for WebAPI RC
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }

        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            container.RegisterType<IDataContext, DataContext>();
            container.RegisterType<IPatientRepository, PatientRepository>();
            container.RegisterType<IPatientService, PatientService>();
            container.RegisterType<IItemFactory, ItemFactory>();
            container.RegisterType<IViewFactory, PatientViewFactory>();

            return container;
        }
    }
}