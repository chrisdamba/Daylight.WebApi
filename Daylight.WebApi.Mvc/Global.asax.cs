using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Castle.Windsor;
using Daylight.WebApi.Core.Exceptions;
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

        /// <summary>
        /// Handles the Error event of the Application control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Application_Error(object sender, EventArgs e)
        {
            try
            {
                //clear the response filter
                Response.Filter = null;
            }
            catch
            {
                // Mask from debugging
            }

            var lastEx = Server.GetLastError();
            Exception found;

            //list of custom redirects
            if (ExceptionTreeHas<UnauthorizedAccessException>(lastEx, out found))
            {
                Response.Redirect("~/Error/Access");
            }
            else if (ExceptionTreeHas<UnavailableItemException>(lastEx, out found))
            {
                Response.Redirect("~/Error/NotFound");
            }
            else if (lastEx is HttpRequestValidationException)
            {
                Response.Redirect("~/Error/Validation");
            }
        }

        /// <summary>
        /// Exceptions the tree has.
        /// </summary>
        /// <typeparam name="T">The type of exception we are looking for</typeparam>
        /// <param name="tree">The tree.</param>
        /// <param name="found">the exception that is found to be of the correct type</param>
        /// <returns><c>True</c> if any of the exceptions in the tree are of type T. <c>False</c>, otherwise.</returns>
        private static bool ExceptionTreeHas<T>(Exception tree, out Exception found)
        {
            if (tree is T)
            {
                found = tree;
                return true;
            }

            while (tree.InnerException != null)
            {
                tree = tree.InnerException;

                if (tree is T)
                {
                    found = tree;
                    return true;
                }
            }

            found = null;
            return false;
        }
    }
}