using System;
using System.Collections.Generic;

namespace Daylight.WebApi.Contracts.Entities
{
    /// <summary>
    /// Interface for role entity
    /// </summary>
    public interface IRole : ISecurityEntity, IStateEntity
    {
        /// <summary>
        /// Gets or sets the role identifier.
        /// </summary>
        /// <value>
        /// The role identifier.
        /// </value>
        Guid RoleId { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        /// <value>
        /// The description.
        /// </value>
        string Description { get; set; }

        /// <summary>
        /// Gets or sets the name of the role.
        /// </summary>
        /// <value>
        /// The name of the role.
        /// </value>
        string RoleName { get; set; }

        /// <summary>
        /// Gets or sets the users.
        /// </summary>
        /// <value>
        /// The users.
        /// </value>
        ICollection<User> Users { get; set; }
    }
}
