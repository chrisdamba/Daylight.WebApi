using System.Web.Mvc;

namespace Daylight.WebApi.Mvc.Controllers
{
    public class DashboardController : Controller
    {
        //
        // GET: /Dashboard/
        public ActionResult Index()
        {
            return View();
        }
    }
}
