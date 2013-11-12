
using System;
using System.Web.Http.Controllers;
using Newtonsoft.Json.Serialization;

namespace Daylight.WebApi.Core.Attributes
{
    /// <summary>
    /// An attribute for ApiControllers which makes them comply with backbone.js formatting standards.
    /// </summary>
    /// <remarks>
    /// This attribute applies globally at present, although it should be applied to every valid
    /// controller for clarity and robustness, and because if later it is made to work on only
    /// the applied controllers.
    /// </remarks>
    [AttributeUsage(AttributeTargets.Class)]
    public class BackboneAttribute : Attribute, IControllerConfiguration
    {
        /// <summary>
        /// Callback invoked to set per-controller overrides for this controllerDescriptor. 
        /// </summary>
        /// <param name="controllerSettings">The controller settings to initialize.</param><param name="controllerDescriptor">The controller descriptor. Note that the <see cref="T:System.Web.Http.Controllers.HttpControllerDescriptor"/> can be associated with the derived controller type given that <see cref="T:System.Web.Http.Controllers.IControllerConfiguration"/> is inherited.</param>
        public void Initialize(HttpControllerSettings controllerSettings, HttpControllerDescriptor controllerDescriptor)
        {
            // Lower camel case JSON properties
            controllerSettings.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
