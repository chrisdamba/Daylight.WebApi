using System;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Services;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Services
{
    public class PasswordService : IPasswordService
    {
        private readonly ISecurityFactory securityFactory;

        public PasswordService()
            : this(Injector.Get<ISecurityFactory>())
        {
        }

        public PasswordService(ISecurityFactory securityFactory)
        {
            this.securityFactory = securityFactory;
        }
        
        public Guid AssignReset(string username)
        {
            // Get user - if none found return empty GUID, but don't try to send mail
            var user = securityFactory.GetUser(username);
            if (user == null)
            {
                return Guid.Empty;
            }

            return Guid.NewGuid();
        }

        public bool IsActiveReset(Guid userId, Guid resetId)
        {
            return true;
        }

        public void ChangePassword(Guid userId, string password)
        {
            // Update the password
            var user = securityFactory.GetUser(userId);
            securityFactory.SetPassword(user, password);
        }

        public bool IsAuthenticated(string password)
        {
            return securityFactory.AuthenticateUser(securityFactory.GetCurrentUserName(), password);
        }
    }
}
