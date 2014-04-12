using System.ComponentModel.DataAnnotations;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Core.Attributes;

namespace Daylight.WebApi.Security.Models
{
    public class RegistrationViewModel : IRegistrationViewModel
    {
        [Required]
        [StringLength(60)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(60)]
        public string LastName { get; set; }

        [Required]
        [UniqueUsername]
        [StringLength(256)]
        public string Username { get; set; }

        [Required]
        [UniqueEmail]
        [StringLength(256)]
        public string Email { get; set; }
        
        [Required]
        [Password]
        public string Password { get; set; }
    }
}