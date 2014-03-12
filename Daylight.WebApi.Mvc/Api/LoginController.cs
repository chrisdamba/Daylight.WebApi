using System.Net;
using System.Web.Http;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Helper;
using Daylight.WebApi.Mvc.Models.Security;

namespace Daylight.WebApi.Mvc.Api
{
    /// <summary>
    /// Handles RESTful Logins for Users
    /// </summary>
    public class LoginController : ApiController
    {
        private readonly ILoginService loginService;

        /// <summary>
        /// Initializes a new instance of the <see cref="LoginController"/> class.
        /// </summary>
        /// <param name="loginService">The login service.</param>
        public LoginController(ILoginService loginService)
        {
            this.loginService = loginService;
        }

        /// <summary>
        /// Handles a HTTP Post action to the <see cref="LoginController"/>.
        /// 
        /// A HTTP Post causes the model specified to be authenticated using the <see cref="ILoginService"/>.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>The result of the authentication process</returns>
        public LoginViewModel Post(LoginViewModel model)
        {
            // If the model fails initial validation is not specified return a simple status error
            if (model == null || ModelState.IsValid == false) throw new HttpResponseException(HttpStatusCode.BadRequest);

            // Use the Login Service and check the result
            var result = loginService.Login(model.UserName, model.Password);

            // Kill the Username and password on the Model as a security precaution
            model.Password = null;
            model.UserName = null;

            // Put the result code on
            model.Message = EnumHelper.GetDisplayName(result);

            // Parse the result
            if (result != LogInResultCode.None)
            {
                return model;
            }

            // The login is valid
            model.Valid = true;

            // Return a parsed model
            return model;
        }
    }
}
