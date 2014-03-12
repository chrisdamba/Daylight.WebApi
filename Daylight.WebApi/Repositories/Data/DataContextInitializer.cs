using System;
using System.Data.Entity;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Repositories.Data
{
    public class DataContextInitializer : DropCreateDatabaseAlways<DataContext>
    {
        private readonly ISecurityFactory securityFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="DataContextInitializer"/> class.
        /// </summary>
        public DataContextInitializer()
            :this(Injector.Get<ISecurityFactory>())
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="DataContextInitializer"/> class.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        public DataContextInitializer(ISecurityFactory securityFactory)
        {
            this.securityFactory = securityFactory;
        }
        
        protected override void Seed(DataContext context)
        {
            var userName1 = securityFactory.CreateUser("chridam", "123456", "chridam@gmail.com");
            securityFactory.CreateMembership(userName1, "Admin");

            var userName2 = securityFactory.CreateUser("ian.muringai", "123456", "imuringai@gmail.com");
            securityFactory.CreateMembership(userName2, "Admin");
        }

        public void InitializeUsers()
        {
            var userName1 = securityFactory.CreateUser("chridam", "123456", "chridam@gmail.com");
            securityFactory.CreateMembership(userName1, "Admin");

            var userName2 = securityFactory.CreateUser("ian.muringai", "123456", "imuringai@gmail.com");
            securityFactory.CreateMembership(userName2, "Admin");
        }


    }
}
