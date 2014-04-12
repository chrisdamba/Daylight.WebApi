using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Core.Attributes
{
    /// <summary>
    /// This class is used to validate if the enterted Email already exists in our system
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class UniqueEmailAttribute : ValidationAttribute
    {
        private const string DEFAULT_ERROR_MESSAGE = @"Email already exists in our system, please enter another Email.";
        private readonly ISecurityFactory securityFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="UniqueEmailAttribute"/> class.
        /// </summary>
        public UniqueEmailAttribute()
            : this(Injector.Get<ISecurityFactory>())
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="UniqueEmailAttribute"/> class.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        public UniqueEmailAttribute(ISecurityFactory securityFactory)
            : base(DEFAULT_ERROR_MESSAGE)
        {
            this.securityFactory = securityFactory;
        }

        /// <summary>
        /// Determines whether the specified value of the object is valid.
        /// </summary>
        /// <param name="value">The value of the specified validation object on which
        /// the <see cref="T:System.ComponentModel.DataAnnotations.ValidationAttribute"/> is declared.</param>
        /// <returns>
        /// True if the specified value is valid; otherwise, false.
        /// </returns>
        public override bool IsValid(object value)
        {
            if (string.IsNullOrEmpty(value as string))
            {
                return false;
            }

            var existingUsers = securityFactory.FindUsersWithEmailAddress((string)value);
            return !existingUsers.Any();
        }
    }
}
