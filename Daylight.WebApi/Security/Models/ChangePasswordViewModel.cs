using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Attributes;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Security.Models
{
    /// <summary>
    /// A view model for changing a user account password, from a password reset email.
    /// </summary>
    [PropertiesMustMatch("Password", "Confirm")]
    public class ChangePasswordViewModel : IValidatableObject
    {
        private readonly ISecurityFactory securityFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChangePasswordViewModel"/> class.
        /// </summary>
        public ChangePasswordViewModel()
            : this(Injector.Get<ISecurityFactory>())
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChangePasswordViewModel"/> class.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="resetId">The reset authorization id.</param>
        public ChangePasswordViewModel(Guid userId, Guid resetId)
            : this(Injector.Get<ISecurityFactory>())
        {
            this.UserId = userId;
            this.ResetId = resetId;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChangePasswordViewModel"/> class.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        public ChangePasswordViewModel(ISecurityFactory securityFactory)
        {
            this.securityFactory = securityFactory;
        }

        /// <summary>
        /// Gets or sets the account username to reset.
        /// </summary>
        [Required]
        [StringLength(256)]
        public string Username { get; set; }

        /// <summary>
        /// Gets or sets the password to set.
        /// </summary>
        [Password]
        [Required]
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets the confirm password, which must match the Password property.
        /// </summary>
        [Required]
        public string Confirm { get; set; }

        /// <summary>
        /// Gets or sets the user account id being reset.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Gets or sets the password reset id.
        /// </summary>
        public Guid ResetId { get; set; }

        /// <summary>
        /// Determines whether the specified object is valid.
        /// </summary>
        /// <param name="validationContext">The validation context.</param>
        /// <returns>A collection that holds failed-validation information.</returns>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var user = securityFactory.GetUser(Username);
            if (user == null || user.UserId != UserId)
            {
                return new[] { new ValidationResult("The username does not match the expected name", new[] { "Username" }) };
            }

            return new ValidationResult[0];
        }
    }
}
