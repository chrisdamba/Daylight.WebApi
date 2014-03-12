using System;
using System.Collections.Generic;

namespace Daylight.WebApi.Contracts.Entities
{
    /// <summary>
    /// Interface for a user entity
    /// </summary>
    public interface IUser : ISecurityEntity, IStateEntity
    {
        /// <summary>
        /// Gets or sets the user identifier.
        /// </summary>
        /// <value>
        /// The user identifier.
        /// </value>
        Guid UserId { get; set; }

        /// <summary>
        /// Gets or sets the name of the user.
        /// </summary>
        /// <value>
        /// The name of the user.
        /// </value>
        string UserName { get; set; }

        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>
        /// The email.
        /// </value>
        string Email { get; set; }

        /// <summary>
        /// Gets or sets the first name.
        /// </summary>
        /// <value>
        /// The first name.
        /// </value>
        string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the last name.
        /// </summary>
        /// <value>
        /// The last name.
        /// </value>
        string LastName { get; set; }


        /// <summary>
        /// Gets or sets the password.
        /// </summary>
        /// <value>
        /// The password.
        /// </value>
        string Password { get; set; }

        /// <summary>
        /// Gets or sets the date created.
        /// </summary>
        /// <value>
        /// The date created.
        /// </value>
        DateTime DateCreated { get; set; }

        /// <summary>
        /// Gets or sets the date modified.
        /// </summary>
        /// <value>
        /// The date modified.
        /// </value>
        DateTime DateModified { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is active.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this instance is active; otherwise, <c>false</c>.
        /// </value>
        bool IsActive { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is approved.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance is approved; otherwise, <c>false</c>.
        /// </value>
        bool IsApproved { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [password expired].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [password expired]; otherwise, <c>false</c>.
        /// </value>
        bool PasswordExpired { get; set; }

        /// <summary>
        /// Gets or sets the password failures since last success.
        /// </summary>
        /// <value>
        /// The password failures since last success.
        /// </value>
        int PasswordFailuresSinceLastSuccess { get; set; }

        /// <summary>
        /// Gets or sets the last password failure date.
        /// </summary>
        /// <value>
        /// The last password failure date.
        /// </value>
        DateTime? LastPasswordFailureDate { get; set; }

        /// <summary>
        /// Gets or sets the last activity date.
        /// </summary>
        /// <value>
        /// The last activity date.
        /// </value>
        DateTime? LastActivityDate { get; set; }

        /// <summary>
        /// Gets or sets the last lockout date.
        /// </summary>
        /// <value>
        /// The last lockout date.
        /// </value>
        DateTime? LastLockoutDate { get; set; }

        /// <summary>
        /// Gets or sets the last login date.
        /// </summary>
        /// <value>
        /// The last login date.
        /// </value>
        DateTime? LastLoginDate { get; set; }

        /// <summary>
        /// Gets or sets the confirmation token.
        /// </summary>
        /// <value>
        /// The confirmation token.
        /// </value>
        string ConfirmationToken { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is locked out.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance is locked out; otherwise, <c>false</c>.
        /// </value>
        bool IsLockedOut { get; set; }

        /// <summary>
        /// Gets or sets the last password changed date.
        /// </summary>
        /// <value>
        /// The last password changed date.
        /// </value>
        DateTime? LastPasswordChangedDate { get; set; }

        /// <summary>
        /// Gets or sets the password verification token.
        /// </summary>
        /// <value>
        /// The password verification token.
        /// </value>
        string PasswordVerificationToken { get; set; }

        /// <summary>
        /// Gets or sets the password verification token expiration date.
        /// </summary>
        /// <value>
        /// The password verification token expiration date.
        /// </value>
        DateTime? PasswordVerificationTokenExpirationDate { get; set; }

        /// <summary>
        /// Gets or sets the comment.
        /// </summary>
        /// <value>
        /// The comment.
        /// </value>
        string Comment { get; set; }

        /// <summary>
        /// Gets or sets the roles.
        /// </summary>
        /// <value>
        /// The roles.
        /// </value>
        ICollection<Role> Roles { get; set; }
    }
}
