using System.Web.Mvc;

namespace Daylight.WebApi.Mvc.Controllers
{
    [AllowAnonymous]
    public class ErrorController : Controller
    {
        public ActionResult Access()
        {
            return View();
        }

        public ActionResult NotFound()
        {
            return View();
        }

        public ActionResult HttpError()
        {
            return View();
        }

        public ActionResult Validation()
        {
            return View();
        }
    }
}
