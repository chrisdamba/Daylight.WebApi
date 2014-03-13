using System;
using System.Web;
using System.Web.Mvc;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Core.Attributes
{
    /// <summary>
    /// Defines a filter which throws an <see cref="UnauthorizedAccessException"/> if the
    /// current user is not authorized. 
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class AuthorizeUserAttribute : ActionFilterAttribute
    {
        private readonly ISecurityFactory securityFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthorizeUserAttribute"/> class.
        /// </summary>
        public AuthorizeUserAttribute()
            : this (Injector.Get<ISecurityFactory>())
        {
        }
        
        /// <summary>
        /// Initializes a new instance of the <see cref="AuthorizeUserAttribute"/> class.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        public AuthorizeUserAttribute(ISecurityFactory securityFactory)
        {
            this.securityFactory = securityFactory;
        }

        /// <summary>
        /// Called by the MVC framework before the action method executes.
        /// </summary>
        /// <param name="filterContext">The filter context.</param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var user = securityFactory.GetUser();
            if (user == null)
            {
                throw new UnauthorizedAccessException("Access denied");
            }
            //authenticate the user
            var authenticated = securityFactory.AuthenticateUser(user.UserName, user.Password);
            if (!authenticated)
            {
                throw new UnauthorizedAccessException("Access denied");
            }
        }


    }
}
