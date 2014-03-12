using System.Web;
using System.Web.Mvc;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Helper;
using Daylight.WebApi.Mvc.Factories.Home;

namespace Daylight.WebApi.Mvc.Controllers
{
    public class HomeController : LoginControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="HomeController"/> class.
        /// </summary>
        /// <param name="loginService">The login service.</param>
        public HomeController(ILoginService loginService)
            : base(loginService)
        {
        }

        public ActionResult Index(string returnUrl = null, string redirectUrl = null)
        {
            var model = new HomeModel
            {
                RedirectUrl = returnUrl ?? redirectUrl
            };

            // Push any login validation errors to view
            var resultCode = (LogInResultCode?)TempData[LOGIN_RESULT_CODE];
            if (resultCode != null && resultCode != LogInResultCode.None)
            {
                var key = "LoginError";
                switch (resultCode)
                {
                    case LogInResultCode.UserNameRequired:
                        key = "UserName_LoginError";
                        break;

                    case LogInResultCode.PasswordRequired:
                        key = "Password_LoginError";
                        break;
                }

                ModelState.AddModelError(key, EnumHelper.GetDisplayName(resultCode.Value));
            }

            return View(model);
        }

        protected override ActionResult LoginSuccessful()
        {
            SaveUserAgentSettings();
            return ContinueToSite();
        }

        /// <summary>
        /// Saves the user agent settings.
        /// </summary>
        private void SaveUserAgentSettings()
        {
            // Clear JS Save variable so it always resets on Login without the need for Logout
            Session.Remove("JavascriptDisabled");

            // Only when javascrpipt is not available on the client should we save something in session to make it so.
            var javascriptDisabled = Request.Form["JavascriptDisabled"];
            if (string.IsNullOrWhiteSpace(javascriptDisabled) == false)
            {
                Session["JavascriptDisabled"] = true;
            }
        }

        /// <summary>
        /// Returns a result that will utilmately redirect the user to the site.
        /// </summary>
        /// <returns></returns>
        private ActionResult ContinueToSite()
        {
            // A Url a user was trying to visit always takes predcedence in the redirect after a login
            if (string.IsNullOrWhiteSpace(Request.Form["redirectUrl"]) == false)
            {
                return Redirect(HttpUtility.UrlDecode(Request.Form["redirectUrl"]));
            }

            return Redirect("/Dashboard/Index");
        }
    }
}
