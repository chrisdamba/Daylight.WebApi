using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Contracts.Entities.Events;

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
        /// Gets the user from it's user name
        /// </summary>
        /// <param name="userName">Login name of the user.</param>
        /// <returns></returns>
        IUser GetUser(string userName);

        /// <summary>
        /// Gets the currently logged in user
        /// </summary>
        /// <returns></returns>
        IUser GetUser();

        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <returns>The list of users</returns>
        IEnumerable<IUser> GetUsers();

        /// <summary>
        /// Gets the Role by it's unique Id
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        /// <returns></returns>
        IRole GetRole(Guid roleId);

        /// <summary>
        /// Gets the Role by it's unique name
        /// </summary>
        /// <param name="name">The Role name.</param>
        /// <returns>The Role name</returns>
        IRole GetRole(string name);

        /// <summary>
        /// Finds the Roles, optionally filtered by organization and other options.
        /// </summary>
        /// <param name="search">The search.</param>
        /// <returns>A list of matching Roles.</returns>
        IEnumerable<IRole> FindRoles(string search);

        /// <summary>
        /// Finds the users.
        /// </summary>
        /// <param name="search">The search.</param>
        /// <returns></returns>
        IEnumerable<IUser> FindUsers(string search);

        /// <summary>
        /// Finds the users with an email containing the provided string.
        /// </summary>
        /// <param name="search">The search term.</param>
        /// <returns>
        /// A list of matching users.
        /// </returns>
        IEnumerable<IUser> FindUsersWithEmailAddress(string search);
        
        /// <summary>
        /// Gets the memberships.
        /// </summary>
        /// <param name="userName">The name of the user.</param>
        /// <param name="withNesting">if set to <c>true</c> nested Roles are returned too.</param>
        /// <returns>
        /// A list of Roles the user is a member of, with inherited Roles if <paramref name="withNesting"/> is true
        /// </returns>
        IEnumerable<IRole> GetMemberships(string userName, bool withNesting = false);

        /// <summary>
        /// Gets the memberships for the current user
        /// </summary>
        /// <returns></returns>
        IEnumerable<IRole> GetMemberships();

        /// <summary>
        /// Updates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        void UpdateUser(IUser user);

        /// <summary>
        /// Updates the username of a user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="userName">The new username</param>
        void UpdateUserName(IUser user, string userName);

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
        IRole CreateRole(Guid roleId, string name);

        /// <summary>
        /// Creates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        string CreateUser(IUser user);

        /// <summary>
        /// Creates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">The password.</param>
        /// <param name="forceReset">If set to <c>true</c> force the create user to reset their password on next login.</param>
        /// <returns></returns>
        string CreateUser(IUser user, string password, bool forceReset = false);

        /// <summary>
        /// Creates the Role.
        /// </summary>
        /// <param name="Role">The Role.</param>
        /// <param name="duplicateCheck">if set to <c>true</c> [duplicate check].</param>
        void CreateRole(IRole Role, bool duplicateCheck = true);

        /// <summary>
        /// Creates the membership for a member to a Role
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        /// <param name="memberRoleId">The member Role id.</param>
        void CreateMembership(Guid roleId, Guid memberRoleId);

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
        void UpdateRole(IRole role);
       
        /// <summary>
        /// Create a Manager
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        IUser CreateManager(string userName);

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
        void RemoveMembership(IRole role, IUser user);

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
        /// <returns>An IUser</returns>
        IUser GetUserBySourceId(string userSourceId);

        /// <summary>
        /// Gets the user by employee id (this is the user's UPN in the SIMS requests).
        /// </summary>
        /// <param name="userEmployeeId">The user employee id.</param>
        /// <returns>
        /// An IUser
        /// </returns>
        IUser GetUserByEmployeeId(string userEmployeeId);

        /// <summary>
        /// Gets the name of the Role by.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        IEnumerable<IRole> GetRolesByName(string name);

        /// <summary>
        /// Gets the Role members.
        /// </summary>
        /// <param name="roleId">The id.</param>
        /// <param name="searchText">The text.</param>
        /// <returns></returns>
        IEnumerable<IRole> GetRoleMembers(Guid roleId, string searchText);

        /// <summary>
        /// Sets the password.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="newPassword">The text.</param>
        /// <param name="forceReset">Whether to force reset on next login</param>
        void SetPassword(IUser user, string newPassword, bool forceReset = false);

        /// <summary>
        /// Sets the password
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="forceReset">Whether to force reset on next login</param>
        /// <returns>
        /// The new set password
        /// </returns>
        string SetPassword(IUser user, bool forceReset = false);

        /// <summary>
        /// Determines whether the user is in a given role
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        bool IsUserInRole(Guid roleId);

        /// <summary>
        /// Determines whether the user is in a given role
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="roleId">The Role id.</param>
        bool IsUserMemberOf(IUser user, Guid roleId);

        /// <summary>
        /// Gets the members in Role.
        /// </summary>
        /// <param name="role">The Role.</param>
        /// <param name="search">The search.</param>
        /// <returns></returns>
        IEnumerable<ISecurityEntity> GetMembersInRole(IRole role, string search = "");

        /// <summary>
        /// Gets the user only members of a Role
        /// </summary>
        /// <param name="roleId">The Role id</param>
        /// <param name="search">The Search</param>
        /// <returns>list of users.</returns>
        IEnumerable<ISecurityEntity> GetUserMembersInRole(Guid roleId, string search);

        /// <summary>
        /// Gets the all the Roles in the system.
        /// </summary>
        /// <returns>A list of all available Roles in the system</returns>
        Dictionary<Guid, IRole> GetRoles();

        /// <summary>
        /// Deletes the Role.
        /// </summary>
        /// <param name="role">The Role.</param>
        void DeleteRole(IRole role);

        /// <summary>
        /// Deletes the user.
        /// </summary>
        /// <param name="user">The user to be deleted</param>
        void DeleteUser(IUser user);

        /// <summary>
        /// Moved the user to a holding org, so that they can finish proceedings, before being removed completely from system.
        /// </summary>
        /// <param name="user">The user.</param>
        void LeaveUser(IUser user);

        /// <summary>
        /// Creates the membership for a Role joining another Role
        /// </summary>
        /// <param name="containerRole">The Role recieving the new member.</param>
        /// <param name="member">The member joining the container.</param>
        void CreateMembership(IRole containerRole, ISecurityEntity member);

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
        IEnumerable<IRole> GetRoleByName(string name);

        /// <summary>
        /// Get Roles for current user as Owner
        /// </summary>
        /// <returns>List of owned Roles</returns>
        IEnumerable<IRole> GetRolesByOwner();

        /// <summary>
        /// Get Roles for current user as Owner
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>
        /// List of owned Roles
        /// </returns>
        IEnumerable<IRole> GetRolesByOwner(ISecurityEntity user);

        /// <summary>
        /// Removes all memberships for a user
        /// </summary>
        /// <param name="user">The user.</param>
        void RemoveAllMemberships(IUser user);

        /// <summary>
        /// Determines whether this Role can be managed by the user
        /// </summary>
        /// <param name="role">The Role.</param>
        bool CanManageRole(IRole role);

        /// <summary>
        /// Gets the user.
        /// </summary>
        /// <param name="id">The guid id.</param>
        /// <returns>The user instance</returns>
        IUser GetUser(Guid id);

        /// <summary>
        /// Gets the users with the specified ids.
        /// </summary>
        /// <param name="ids">The ids.</param>
        /// <returns>The users</returns>
        IEnumerable<IUser> GetUser(Guid[] ids);

        /// <summary>
        /// Gets the principal with claims.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        Claim[] GetClaims(IUser user);

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
        /// <returns>A list of IUsers</returns>
        IEnumerable<IUser> GetRoleUserMembers(IRole role, string search);

    }
}
