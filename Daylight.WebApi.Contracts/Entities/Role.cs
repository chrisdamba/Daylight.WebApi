//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Daylight.WebApi.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Role : IStateEntity
    {
        public Role()
        {
            this.Users = new HashSet<User>();
        }
    
        public System.Guid RoleId { get; set; }
        public string Description { get; set; }
        [Required]
        public string RoleName { get; set; }
    
        public virtual ICollection<User> Users { get; set; }
    }
}
