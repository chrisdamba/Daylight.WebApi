using System.Web.Mvc;
using Castle.Windsor;
using Castle.Windsor.Installer;

namespace Daylight.WebApi.Plumbing
{
    public static class ContainerFactory
    {
        private static IWindsorContainer Container { get; set; }

        public static IWindsorContainer Create()
        {
            Container = new WindsorContainer();
            Container.Install(FromAssembly.This());
            ConfigureControllers();
            return Container;
        }

        private static void ConfigureControllers()
        {
            var controllerFactory = new WindsorControllerFactory(Container.Kernel);
            ControllerBuilder.Current.SetControllerFactory(controllerFactory);
        }
    }
}