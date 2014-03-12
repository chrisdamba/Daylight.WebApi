using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Helper;

namespace Daylight.WebApi.Mvc.Controllers
{
    public class HomeController : LoginControllerBase
    {
        private readonly ISecurityFactory securityFactory;
        
        public HomeController(ISecurityFactory securityFactory, ILoginService loginService)
            : base(loginService)
        {
            this.securityFactory = securityFactory;
        }

        public ActionResult Index()
        {
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

            return View();
        }

        protected override ActionResult LoginSuccessful()
        {
            throw new NotImplementedException();
        }
    }
}
