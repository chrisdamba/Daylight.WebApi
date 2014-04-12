using System;
using System.ComponentModel.DataAnnotations;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Attributes;
using Daylight.WebApi.Core.IoC;

namespace Daylight.WebApi.Security.Models
{
    /// <summary>
    /// A view model for updating a users password.
    /// </summary>
    [PropertiesMustMatch("Password", "ConfirmPassword")]
    public class PasswordViewModel
    {
        private readonly ISecurityFactory securityFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="PasswordViewModel"/> class.
        /// </summary>
        public PasswordViewModel()
            :this(Injector.Get<ISecurityFactory>())
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="PasswordViewModel" /> class.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="redirectUrl">The redirect URL.</param>
        public PasswordViewModel(Guid userId, string redirectUrl)
        {
            this.RedirectUrl = redirectUrl;
            this.UserId = userId;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="PasswordViewModel"/> class.
        /// </summary>
        /// <param name="securityFactory">The security factory.</param>
        public PasswordViewModel(ISecurityFactory securityFactory)
        {
            this.securityFactory = securityFactory;
        }

        /// <summary>
        /// Gets or sets the user account id being reset.
        /// </summary>
        public Guid UserId { get; set; }
        
        /// <summary>
        /// Gets or sets the old password, for verification purposes.
        /// </summary>
        [Required]
        [Password]
        public string OldPassword { get; set; }

        /// <summary>
        /// Gets or sets the new password to set.
        /// </summary>
        [Required]
        [Password]
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets the new password, to confirm it was typed correctly.
        /// </summary>
        [Required]
        public string ConfirmPassword { get; set; }

        /// <summary>
        /// Gets or sets the redirect URL to navigate to on save or cancel, if provided.
        /// </summary>
        public string RedirectUrl { get; set; }
    }
}
