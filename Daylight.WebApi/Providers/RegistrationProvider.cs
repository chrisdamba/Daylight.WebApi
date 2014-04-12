using System.Collections.Specialized;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Security.Models;

namespace Daylight.WebApi.Providers
{
    public class RegistrationProvider : IRegistrationProvider
    {
        public IRegistrationViewModel Create()
        {
            return new RegistrationViewModel();
        }

        public IRegistrationViewModel Load(NameValueCollection form)
        {
            return new RegistrationViewModel
            {
                Username = form["Username"],
                Email = form["Email"],
                FirstName = form["FirstName"],
                LastName = form["LastName"],
                Password = form["Password"]
            };
        }
    }
}
