using System;

namespace Daylight.WebApi.Contracts
{
    /// <summary>
    /// A password service which assigns reset authorization ids to a user, and allows a new
    /// password to be set for that user provided the reset id is valid.
    /// </summary>
    public interface IPasswordService
    {
        /// <summary>
        /// Assigns a reset id to the user with the provided username. This replaces any existing
        /// reset records.
        /// </summary>
        /// <param name="username">The username to assign a reset for.</param>
        /// <returns>The assigned reset id.</returns>
        Guid AssignReset(string username);

        /// <summary>
        /// Indicates whether the user and reset id combination is valid.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="resetId">The reset authorization id.</param>
        /// <returns>True if authorized, false otherwise.</returns>
        bool IsActiveReset(Guid userId, Guid resetId);

        /// <summary>
        /// Changes the password for the provided user, if the reset id is valid for that user.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="password">The new password.</param>
        void ChangePassword(Guid userId, string password);


        /// <summary>
        /// Indicates whether the specified password is authenticated for the current user.
        /// </summary>
        /// <param name="password">The password.</param>
        /// <returns>True if the specified password is authenticated, false otherwise.</returns>
        bool IsAuthenticated(string password);
    }
}
