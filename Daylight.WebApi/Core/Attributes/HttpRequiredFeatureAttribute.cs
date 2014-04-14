using System;
using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;
using Daylight.WebApi.Security;

namespace Daylight.WebApi.Core.Attributes
{
    /// <summary>
    /// Defines a filter which throws an <see cref="UnauthorizedAccessException"/> if the
    /// current user does not have the required features.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class HttpRequiredFeatureAttribute : ActionFilterAttribute
    {
        private readonly ISecurityFactory securityFactory;
        private readonly FeatureIdentifier[] features;

        /// <summary>
        /// Initializes a new instance of the <see cref="HttpRequiredFeatureAttribute"/> class.
        /// </summary>
        /// <param name="features">The features which are required.</param>
        public HttpRequiredFeatureAttribute(params FeatureIdentifier[] features)
            : this(Injector.Get<ISecurityFactory>(), features)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HttpRequiredFeatureAttribute"/> class.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        /// <param name="features">The features which are required.</param>
        public HttpRequiredFeatureAttribute(ISecurityFactory securityFactory, params FeatureIdentifier[] features)
        {
            // Ensure valid arguments
            if (features == null || features.Any() == false)
            {
                throw new ArgumentNullException("The RequiredFeatureAttribute requires 1 or more feature identifiers.");
            }

            this.securityFactory = securityFactory;
            this.features = features;
        }

        /// <summary>
        /// Occurs before the action method is invoked.
        /// </summary>
        /// <param name="actionContext">The action context.</param>
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            CheckFeatures();
        }

        /// <summary>
        /// Checks the features set on this attribute, and throws an <see cref="UnauthorizedAccessException"/>
        /// if not authorized.
        /// </summary>
        private void CheckFeatures()
        {
            // If there is no logged in user, do not protect the action using Feature Security
            if (securityFactory.GetUser() == null)
            {
                throw new UnauthorizedAccessException("Access denied");
            }

            // Check required features
            // NOTE: We want to move this attribute to be provider driven, so that this attribute merely designates the action as related to a
            //       feature, rather than always checking the user is authorized.
            var denied = securityFactory.IsAuthorized(features).Any(a => a.Value == false);
            if (denied)
            {
                throw new UnauthorizedAccessException("Access to feature was denied.");
            }
        }
    }
}
