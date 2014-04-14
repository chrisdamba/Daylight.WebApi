using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Web.Security;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Contracts.Entities.Events;
using Daylight.WebApi.Security;

namespace Daylight.WebApi.Contracts
{
    /// <summary>
    /// The security factory
    /// </summary>
    public interface ISecurityFactory
    {
        /// <summary>
        /// Occurs when a new user is created.
        /// </summary>
        event EventHandler<UserCreatedEventArguments> UserCreated;

        /// <summary>
        /// Occurs when a user is authenticated.
        /// </summary>
        event EventHandler<UserAuthenticatedEventArgs> UserAuthenticated;

        /// <summary>
        /// Occurs when a username is changed.
        /// </summary>
        event EventHandler<UserUpdatingEventArgs> UserNameUpdated;

        /// <summary>
        /// Occurs when a user is updated.
        /// </summary>
        event EventHandler<UserUpdatingEventArgs> UserUpdated;

        /// <summary>
        /// Occurs when a users password is updated.
        /// </summary>
        event EventHandler<UserPasswordChangedEventArgs> UserPasswordUpdated;

        /// <summary>
        /// Gets or sets the secuity user.
        /// </summary>
        /// <value>
        /// The secuity user.
        /// </value>
        MembershipUser SecurityUser { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is authenticated.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance is authenticated; otherwise, <c>false</c>.
        /// </value>
        bool IsAuthenticated { get; set; }

        /// <summary>
        /// Gets the user from it's user name
        /// </summary>
        /// <param name="userName">Login name of the user.</param>
        /// <returns></returns>
        User GetUser(string userName);

        /// <summary>
        /// Gets the currently logged in user
        /// </summary>
        /// <returns></returns>
        User GetUser();

        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <returns>The list of users</returns>
        IEnumerable<User> GetUsers();

        /// <summary>
        /// Gets the Role by it's unique Id
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        /// <returns></returns>
        Role GetRole(Guid roleId);

        /// <summary>
        /// Gets the Role by it's unique name
        /// </summary>
        /// <param name="name">The Role name.</param>
        /// <returns>The Role name</returns>
        Role GetRole(string name);

        /// <summary>
        /// Finds the Roles, optionally filtered by organization and other options.
        /// </summary>
        /// <param name="search">The search.</param>
        /// <returns>A list of matching Roles.</returns>
        IEnumerable<Role> FindRoles(string search);

        /// <summary>
        /// Finds the users.
        /// </summary>
        /// <param name="search">The search.</param>
        /// <returns></returns>
        IEnumerable<User> FindUsers(string search);

        /// <summary>
        /// Finds the users with an email containing the provided string.
        /// </summary>
        /// <param name="search">The search term.</param>
        /// <returns>
        /// A list of matching users.
        /// </returns>
        IEnumerable<User> FindUsersWithEmailAddress(string search);
        
        /// <summary>
        /// Gets the memberships.
        /// </summary>
        /// <param name="userName">The name of the user.</param>
        /// <param name="withNesting">if set to <c>true</c> nested Roles are returned too.</param>
        /// <returns>
        /// A list of Roles the user is a member of, with inherited Roles if <paramref name="withNesting"/> is true
        /// </returns>
        IEnumerable<Role> GetMemberships(string userName, bool withNesting = false);

        /// <summary>
        /// Gets the memberships for the current user
        /// </summary>
        /// <returns></returns>
        IEnumerable<Role> GetMemberships();

        /// <summary>
        /// Updates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        void UpdateUser(User user);

        /// <summary>
        /// Updates the username of a user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="userName">The new username</param>
        void UpdateUserName(User user, string userName);

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        bool AuthenticateUser(string userName, string password);

        /// <summary>
        /// Creates the Role.
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        /// <param name="name">The name.</param>
        Role CreateRole(Guid roleId, string name);

        /// <summary>
        /// Creates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <param name="email">The email.</param>
        /// <param name="firstName">The first name.</param>
        /// <param name="lastName">The last name.</param>
        /// <returns></returns>
        string CreateUser(string userName, string password, string email, string firstName, string lastName);
        
        /// <summary>
        /// Creates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        string CreateUser(User user);

        /// <summary>
        /// Creates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">The password.</param>
        /// <param name="forceReset">If set to <c>true</c> force the create user to reset their password on next login.</param>
        /// <returns></returns>
        string CreateUser(User user, string password, bool forceReset = false);

        /// <summary>
        /// Creates the membership for a member to a Role
        /// </summary>
        /// <param name="containerRoleId">The Role id.</param>
        /// <param name="userName">Name of the user.</param>
        void CreateMembership(Guid containerRoleId, string userName);

        /// <summary>
        /// Updates the Role.
        /// </summary>
        /// <param name="role">The Role.</param>
        void UpdateRole(Role role);
       
        /// <summary>
        /// Gets the user name of the current user.
        /// </summary>
        /// <returns></returns>
        string GetCurrentUserName();

        /// <summary>
        /// Removes the membership for a member to a Role
        /// </summary>
        /// <param name="roleSourceId">The Role id.</param>
        /// <param name="userSourceId">The member id.</param>
        void RemoveMembership(string roleSourceId, string userSourceId);

        /// <summary>
        /// Removes the membership for a member to a Role
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        /// <param name="memberRoleId">The member Role id.</param>
        void RemoveMembership(Guid roleId, Guid memberRoleId);

        /// <summary>
        /// Removes the membership for a member to a Role
        /// </summary>
        /// <param name="role">The Role.</param>
        /// <param name="user">The member user to remove.</param>
        void RemoveMembership(Role role, User user);

        /// <summary>
        /// Removes the membership for a member to a Role
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        /// <param name="userName">Name of the user.</param>
        void RemoveMembership(Guid roleId, string userName);

        /// <summary>
        /// Removes all Role memberships in a Role
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        void RemoveAllMemberships(Guid roleId);

        /// <summary>
        /// Gets the user by source userSourceId.
        /// </summary>
        /// <param name="userSourceId">The userSourceId.</param>
        /// <returns>An User</returns>
        User GetUserBySourceId(string userSourceId);

        /// <summary>
        /// Gets the user by employee id (this is the user's UPN in the SIMS requests).
        /// </summary>
        /// <param name="userEmployeeId">The user employee id.</param>
        /// <returns>
        /// An User
        /// </returns>
        User GetUserByEmployeeId(string userEmployeeId);

        /// <summary>
        /// Gets the name of the Role by.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        IEnumerable<Role> GetRolesByName(string name);

        /// <summary>
        /// Gets the Role members.
        /// </summary>
        /// <param name="roleId">The id.</param>
        /// <param name="searchText">The text.</param>
        /// <returns></returns>
        IEnumerable<Role> GetRoleMembers(Guid roleId, string searchText);

        /// <summary>
        /// Sets the password.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="newPassword">The text.</param>
        /// <param name="forceReset">Whether to force reset on next login</param>
        void SetPassword(User user, string newPassword, bool forceReset = false);

        /// <summary>
        /// Sets the password
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="forceReset">Whether to force reset on next login</param>
        /// <returns>
        /// The new set password
        /// </returns>
        string SetPassword(User user, bool forceReset = false);

        /// <summary>
        /// Determines whether the user is in a given role
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="roleId">The Role id.</param>
        bool IsUserMemberOf(User user, Guid roleId);

        /// <summary>
        /// Gets the members in Role.
        /// </summary>
        /// <param name="role">The Role.</param>
        /// <param name="search">The search.</param>
        /// <returns></returns>
        IEnumerable<User> GetMembersInRole(Role role, string search = "");

        /// <summary>
        /// Gets the user only members of a Role
        /// </summary>
        /// <param name="roleId">The Role id</param>
        /// <param name="search">The Search</param>
        /// <returns>list of users.</returns>
        IEnumerable<User> GetUserMembersInRole(Guid roleId, string search);

        /// <summary>
        /// Gets the all the Roles in the system.
        /// </summary>
        /// <returns>A list of all available Roles in the system</returns>
        Dictionary<Guid, Role> GetRoles();

        /// <summary>
        /// Deletes the Role.
        /// </summary>
        /// <param name="role">The Role.</param>
        void DeleteRole(Role role);

        /// <summary>
        /// Deletes the user.
        /// </summary>
        /// <param name="user">The user to be deleted</param>
        void DeleteUser(User user);

        /// <summary>
        /// Creates the membdership for a user to a role.
        /// </summary>
        /// <param name="roleName">Name of the role.</param>
        /// <param name="userName">Name of the user.</param>
        void CreateMembership(string roleName, string userName);

        /// <summary>
        /// Determines whether this user can manage the given user
        /// </summary>
        /// <param name="userName">The user name</param>
        bool CanManageUser(string userName);

        /// <summary>
        /// Determines whether this user can manage the given role
        /// </summary>
        /// <param name="roleName">The role name</param>
        bool CanManageRole(string roleName);

        /// <summary>
        /// Gets the Roles by name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        IEnumerable<Role> GetRoleByName(string name);

        /// <summary>
        /// Get Roles for current user as Owner
        /// </summary>
        /// <returns>List of owned Roles</returns>
        IEnumerable<Role> GetRolesByOwner();

        /// <summary>
        /// Get Roles for current user as Owner
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>
        /// List of owned Roles
        /// </returns>
        IEnumerable<Role> GetRolesByOwner(User user);

        /// <summary>
        /// Removes all memberships for a user
        /// </summary>
        /// <param name="user">The user.</param>
        void RemoveAllMemberships(User user);

        /// <summary>
        /// Determines whether this Role can be managed by the user
        /// </summary>
        /// <param name="role">The Role.</param>
        bool CanManageRole(Role role);

        /// <summary>
        /// Gets the user.
        /// </summary>
        /// <param name="id">The guid id.</param>
        /// <returns>The user instance</returns>
        User GetUser(Guid id);

        /// <summary>
        /// Gets the users with the specified ids.
        /// </summary>
        /// <param name="ids">The ids.</param>
        /// <returns>The users</returns>
        IEnumerable<User> GetUser(Guid[] ids);

        /// <summary>
        /// Gets the principal with claims.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        Claim[] GetClaims(User user);

        /// <summary>
        /// Gets the principal.
        /// </summary>
        /// <param name="sid">The sid.</param>
        /// <returns>The IPrincipal</returns>
        IPrincipal GetPrincipal(SecurityIdentifier sid);

        /// <summary>
        /// Gets the Role user members.
        /// </summary>
        /// <param name="role">The Role.</param>
        /// <param name="search">The search.</param>
        /// <returns>A list of Users</returns>
        IEnumerable<User> GetRoleUserMembers(Role role, string search);

        /// <summary>
        /// Gets whether a given user is authorized to use a feature of 
        /// the product
        /// </summary>
        /// <param name="forFeature">The name of the user accessing the feature</param>
        /// <returns>True if authorized, false otherwise</returns>
        bool IsAuthorized(FeatureIdentifier forFeature);

        /// <summary>
        /// Gets whether a given user is authorized to use a feature of 
        /// the product
        /// </summary>
        /// <param name="forFeature">The name of the user accessing the feature</param>
        /// <returns>True if authorized, false otherwise</returns>
        IDictionary<FeatureIdentifier, bool> IsAuthorized(params FeatureIdentifier[] forFeature);

        /// <summary>
        /// Notifies the user login.
        /// </summary>
        void NotifyUserLogin();

    }
}
