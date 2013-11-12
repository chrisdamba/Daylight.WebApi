using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace Daylight.WebApi.Mvc
{
    /// <summary>
    /// A static class defining utility extension methods for the <see cref="Controller"/> and
    /// <see cref="ApiController"/> classes.
    /// </summary>
    public static class ControllerExtensions
    {
        /// <summary>
        /// Returns an exception for a 400 Bad Request, with the provided message and appends
        /// appropriate model state validation error messages if found.
        /// </summary>
        /// <param name="controller">The controller to extend.</param>
        /// <param name="message">The returned message.</param>
        /// <returns>An exception to throw.</returns>
        public static Exception BadRequestException(this ApiController controller, string message)
        {
            var error = controller
                .ModelState
                .SelectMany(x => x.Value.Errors)
                .Select(x => string.IsNullOrEmpty(x.ErrorMessage) && x.Exception != null ? x.Exception.Message : x.ErrorMessage)
                .FirstOrDefault();
            if (error != null)
            {
                message = string.Concat(message, ": ", error);
            }

            var response = new HttpResponseMessage(HttpStatusCode.BadRequest) { Content = new StringContent(message) };
            return new HttpResponseException(response);
        }
    }
}
