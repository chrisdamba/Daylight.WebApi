using System;
using System.Web.Mvc;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Attributes;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Mvc.Controllers
{
    [AuthorizeUser]
    public class RegistrationController : Controller
    {
        private readonly IRegistrationService registrationService;

        public RegistrationController()
            : this(Injector.Get<IRegistrationService>())
        {
        }

        public RegistrationController(IRegistrationService registrationService)
        {
            this.registrationService = registrationService;
        }

        /// <summary>
        /// Returns a view for the provided space registration page.
        /// </summary>
        /// <returns>A view result.</returns>
        public ViewResult Create()
        {
            // Default model
            var model = registrationService.Load();
            return View(model);
        }

        /// <summary>
        /// Creates a new user account for the provided space, or returns the view with validation errors.
        /// </summary>
        /// <param name="redirect">A URL to redirect to on success.</param>
        /// <returns>A redirect or view result.</returns>
        [ActionName("Create")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult PostCreate(string redirect = null)
        {
            // Build model from form
            var model = registrationService.Load(Request.Form);

            // Save if valid
            if (registrationService.Validate(model, ModelState))
            {
                var id = registrationService.Save(model);

                // Could take in redirect on action, or use provider, or static as shown here
                return redirect != null
                    ? (ActionResult)Redirect(redirect)
                    : RedirectToAction("Index", "Dashboard");
            }

            // Return with validation
            return View(model);
        }
    }
}
