using System.Web.Mvc;
using Daylight.WebApi.Core.Attributes;

namespace Daylight.WebApi.Mvc.Controllers
{
    [AuthorizeUser]
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
