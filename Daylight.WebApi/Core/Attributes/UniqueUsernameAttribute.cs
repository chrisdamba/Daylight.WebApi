using System;
using System.ComponentModel.DataAnnotations;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Core.Attributes
{
    /// <summary>
    /// Ensures that the given string username does not already exist in the database.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class UniqueUsernameAttribute : ValidationAttribute
    {
        private const string NOT_EXISTS_ERROR_MESSAGE = @"This username has already been registered, please choose another";
        private const string EXISTS_ERROR_MESSAGE = @"This username could not be found";

        private readonly UsernameValidationEnforce enforce;
        private readonly ISecurityFactory securityFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="UniqueUsernameAttribute"/> class for testing.
        /// </summary>
        /// <param name="enforce">The validation requirement being enforced.</param>
        public UniqueUsernameAttribute(UsernameValidationEnforce enforce = UsernameValidationEnforce.NotExists)
            : this(Injector.Get<ISecurityFactory>(), enforce)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="UniqueUsernameAttribute"/> class for testing.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        /// <param name="enforce">The validation requirement being enforced.</param>
        public UniqueUsernameAttribute(ISecurityFactory securityFactory, UsernameValidationEnforce enforce = UsernameValidationEnforce.NotExists)
        {
            this.securityFactory = securityFactory;
            this.enforce = enforce;
        }

        /// <summary>
        /// Applies formatting to an error message based on the data field where the error occurred.
        /// </summary>
        /// <param name="name">The name of the data field where the error occurred.</param>
        /// <returns>
        /// An instance of the formatted error message.
        /// </returns>
        public override string FormatErrorMessage(string name)
        {
            return enforce == UsernameValidationEnforce.NotExists ? NOT_EXISTS_ERROR_MESSAGE : EXISTS_ERROR_MESSAGE;
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
            if (!string.IsNullOrEmpty(value as string))
            {
                var shouldBeNull = enforce == UsernameValidationEnforce.NotExists;
                var userIsNull = securityFactory.GetUser((string)value) == null;

                return shouldBeNull == userIsNull;
            }

            return false;
        }
    }

    /// <summary>
    /// An enumeration of possible username validation requirements.
    /// </summary>
    public enum UsernameValidationEnforce
    {
        /// <summary>
        /// The username is required to exist.
        /// </summary>
        Exists,

        /// <summary>
        /// The username is required to not exist.
        /// </summary>
        NotExists
    }
}
