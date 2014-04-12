namespace Daylight.WebApi.Contracts
{
    /// <summary>
    /// A contract for the registration view model, describing the bare minimum information needed
    /// to register an account. Any additional information required should be added to view model
    /// classes implementing this interface.
    /// </summary>
    public interface IRegistrationViewModel
    {
        /// <summary>
        /// Gets or sets the account first name.
        /// </summary>
        string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the account last name.
        /// </summary>
        string LastName { get; set; }

        /// <summary>
        /// Gets or sets the username.
        /// </summary>
        string Username { get; set; }

        /// <summary>
        /// Gets or sets the account email address.
        /// </summary>
        string Email { get; set; }

        /// <summary>
        /// Gets or sets the account password.
        /// </summary>
        string Password { get; set; }
    }
}
