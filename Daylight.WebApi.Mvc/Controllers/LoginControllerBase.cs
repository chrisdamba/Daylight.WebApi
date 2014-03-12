using System.Threading;
using System.Web.Mvc;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Mvc.Controllers
{
    /// <summary>
    /// The base controller for login functions to promote reuse across sites.
    /// </summary>
    public abstract class LoginControllerBase : Controller
    {
        public const string LOGIN_RESULT_CODE = "LOGIN_RESULT_CODE";
        public const string LOGIN_USERNAME = "userName";

        protected readonly ILoginService loginService;

        /// <summary>
        /// Initializes a new instance of the <see cref="LoginControllerBase"/> class.
        /// </summary>
        protected LoginControllerBase()
            : this(Injector.Get<ILoginService>())
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="LoginControllerBase"/> class.
        /// </summary>
        /// <param name="loginService">The login service.</param>
        protected LoginControllerBase(ILoginService loginService)
        {
            this.loginService = loginService;
        }

        /// <summary>
        /// Login action for a user.
        /// </summary>
        /// <param name="username">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <returns>The action result.</returns>
        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            TempData[LOGIN_USERNAME] = (username ?? string.Empty).Trim();

            // Attempt to log in and act accordingly
            var result = loginService.Login(username, password);
            if (result == LogInResultCode.None)
            {
                return LoginSuccessful();
            }

            return Invalid(result);
        }

        /// <summary>
        /// Logs the user out of the system.
        /// </summary>
        /// <returns>A redirect result.</returns>
        public RedirectToRouteResult Logout()
        {
            // Remove authentication and drop session
            loginService.Logout();
            Session.Abandon();

            return RedirectToAction("Index");
        }

        /// <summary>
        /// An action for javascript to hit to keep a login session active.
        /// </summary>
        /// <returns>A JSON result.</returns>
        public JsonResult KeepAlive()
        {
            return Json(new {success = true}, JsonRequestBehavior.AllowGet);
        }

        #region Protected Methods

        /// <summary>
        /// Result method to respond to an invalid login action, either because of an invalid username, password, or some other issue.
        /// </summary>
        /// <param name="resultCode">The login result code.</param>
        /// <returns>The action result.</returns>
        protected virtual ActionResult Invalid(LogInResultCode resultCode)
        {
            // Prevent brute force attacks
            Thread.Sleep(500);

            // Maintain reason
            TempData[LOGIN_RESULT_CODE] = resultCode;

            // Redirect to source page, or failing that index
            return Request.UrlReferrer != null
                ? (ActionResult) Redirect(Request.UrlReferrer.ToString())
                : RedirectToAction("Index");
        }

        /// <summary>
        /// Result when user successfully logged in.
        /// </summary>
        /// <returns>The action result.</returns>
        protected abstract ActionResult LoginSuccessful();

        /// <summary>
        /// Performs additional validation on the username and password provided, such as that
        /// they contain no invalid characters.
        /// </summary>
        /// <param name="username">The username provided.</param>
        /// <param name="password">The password provided.</param>
        /// <returns>True if the arguments are valid, False otherwise.</returns>
        protected virtual bool ValidateArguments(string username, string password)
        {
            // Allow everything
            return true;
        }

        #endregion
    }
}