using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Castle.Windsor;
using Daylight.WebApi.Repositories.Data;
using Thinktecture.IdentityModel.Http.Cors.WebApi;

namespace Daylight.WebApi.Mvc
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        public static IWindsorContainer Container; 
        protected void Application_Start()
        {
            // Register Controllers - API first then Areas second
            //RegisterApi();
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Bootstrapper.Initialise();

            var data = new DataContextInitializer();
            data.InitializeUsers();
        }

        private static void RegisterApi()
        {
            // CORS Support
            var corsConfig = new WebApiCorsConfiguration();
            corsConfig.RegisterGlobal(GlobalConfiguration.Configuration);
            corsConfig.ForResources("Attachment").ForAllOrigins().AllowAll();
            corsConfig.ForResources("Condition").ForAllOrigins().AllowAll();
            corsConfig.ForResources("Patient").ForAllOrigins().AllowAll();
            corsConfig.ForResources("Thumbnail").ForAllOrigins().AllowAll();
            corsConfig.ForResources("File").ForAllOrigins().AllowAll();
            corsConfig.ForResources("Folder").ForAllOrigins().AllowAll();
            corsConfig.ForResources("Parent").ForAllOrigins().AllowAll();
            corsConfig.ForResources("Image").ForAllOrigins().AllowAll();
            corsConfig.ForResources("Membership").ForAllOrigins().AllowAll();
        }
    }
}