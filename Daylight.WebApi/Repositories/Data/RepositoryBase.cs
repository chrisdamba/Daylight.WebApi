using System;

namespace Daylight.WebApi.Repositories.Data
{
    /// <summary>
    /// A Repository Base which will simplfy creation of Data Contexts and other common tasks
    /// </summary>
    /// <typeparam name="TInterface">The interface of the DataContext the repository should work against</typeparam>
    /// <typeparam name="TType">The type of the DataContext the repository should work against</typeparam>
    public class RepositoryBase<TInterface, TType>
        where TInterface : class
        where TType : TInterface, new()
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RepositoryBase{TInterface, TType}" /> class.
        /// </summary>
        public RepositoryBase()
        {
            this.Resolve = () => new TType();
        }

        /// <summary>
        /// Gets or sets the create context function.
        /// </summary>
        public Func<TInterface> Resolve { get; set; }

        /// <summary>
        /// Gets the created context.
        /// </summary>
        protected TInterface CreateContext { get { return Resolve.Invoke(); } }
    }
}
