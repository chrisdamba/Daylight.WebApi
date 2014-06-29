using System;
using System.Web.Mvc;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Services;
using Daylight.WebApi.Core.IoC;
using Daylight.WebApi.Security.Models;

namespace Daylight.WebApi.Mvc.Controllers
{
    /// <summary>
    /// An MVC controller supporting password relating functionality, primarily the request
    /// password reset workflow.
    /// </summary>
    [AllowAnonymous]
    public class PasswordController : Controller
    {
        private readonly IPasswordService passwordService;

        /// <summary>
        /// Initializes a new instance of the <see cref="PasswordController"/> class.
        /// </summary>
        public PasswordController()
            :this(Injector.Get<IPasswordService>())
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="PasswordController"/> class.
        /// </summary>
        /// <param name="passwordService">The password service.</param>
        public PasswordController(IPasswordService passwordService)
        {
            this.passwordService = passwordService;
        }

        /// <summary>
        /// Returns the password change view, allowing a user to change their password.
        /// </summary>
        /// <param name="id">The user account id.</param>
        /// <param name="redirectUrl">A redirect URL to return to after saving.</param>
        /// <param name="redirectToSource">Whether to automatically use the URL referrer to find a redirect URL.</param>
        /// <returns> A view result. </returns>
        public ViewResult Change(Guid id, string redirectUrl = null, bool redirectToSource = false)
        {
            // Use URL referrer if requested
            if (redirectToSource && Request.UrlReferrer != null)
            {
                redirectUrl = Request.UrlReferrer.ToString();
            }

            var model = new PasswordViewModel(id, redirectUrl);
            return View(model);
        }

        /// <summary>
        /// Saves the users chosen new password, or returns the view if it's invalid.
        /// </summary>
        /// <param name="model">The posted model.</param>
        /// <returns>A view result, or a redirect result.</returns>
        [HttpPost]
        public ActionResult Change(PasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                // Don't pass back passwords
                return View(new PasswordViewModel(model.UserId, model.RedirectUrl));
            }

            if (!passwordService.IsAuthenticated(model.OldPassword))
            {
                ModelState.AddModelError("OldPassword", "Your current password is incorrect");
                // Don't pass back passwords
                return View(new PasswordViewModel(model.UserId, model.RedirectUrl));
            }

            passwordService.ChangePassword(model.UserId, model.Password);

            // Redirect to dashboard if no redirect URL supplied
            if (string.IsNullOrWhiteSpace(model.RedirectUrl))
            {
                return RedirectToAction("Index", "Dashboard");
            }

            return Redirect(model.RedirectUrl);
        }


    }
}
