﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Hosting;
using System.Web.Security;
using Daylight.WebApi.Contracts;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Contracts.Entities.Events;
using Daylight.WebApi.Repositories.Data;

namespace Daylight.WebApi.Security.Factories
{
    public class DataContextSecurityFactory : RepositoryBase<IDataContext, DataContext>, ISecurityFactory
    {
        /// <summary>
        /// Occurs when a new user is created.
        /// </summary>
        public event EventHandler<UserCreatedEventArguments> UserCreated;

        /// <summary>
        /// Occurs when a user is authenticated.
        /// </summary>
        public event EventHandler<UserAuthenticatedEventArgs> UserAuthenticated;

        /// <summary>
        /// Occurs when a username is changed.
        /// </summary>
        public event EventHandler<UserUpdatingEventArgs> UserNameUpdated;

        /// <summary>
        /// Occurs when a user is updated.
        /// </summary>
        public event EventHandler<UserUpdatingEventArgs> UserUpdated;

        /// <summary>
        /// Occurs when a users password is updated.
        /// </summary>
        public event EventHandler<UserPasswordChangedEventArgs> UserPasswordUpdated;

        /// <summary>
        /// Holds the cached security factory instance.
        /// </summary>
        private ISecurityFactory securityFactory;

        /// <summary>
        /// Gets or sets the security factory.
        /// </summary>
        public ISecurityFactory SecurityFactory
        {
            get { return securityFactory ?? (securityFactory = Factories.SecurityFactory.Current); }
            set { securityFactory = value; }
        }

        /// <summary>
        /// The maximum invalid password attempts
        /// </summary>
        public const int MaxInvalidPasswordAttempts = 5;
        

        /// <summary>
        /// Gets the user from it's user name
        /// </summary>
        /// <param name="userName">Login name of the user.</param>
        /// <returns></returns>
        public IUser GetUser(string userName)
        {
            using (var context = CreateContext)
            {
                return context.Users.SingleOrDefault(x => x.UserName == userName);
            }
        }

        /// <summary>
        /// Gets the currently logged in user
        /// </summary>
        /// <returns></returns>
        public IUser GetUser()
        {
            var currentUserName = SecurityFactory.GetCurrentUserName();

            return string.IsNullOrWhiteSpace(currentUserName) ? null : SecurityFactory.GetUser(currentUserName);
        }

        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <returns>
        /// The list of users
        /// </returns>
        public IEnumerable<IUser> GetUsers()
        {
            using (var context = CreateContext)
            {
                return context.Users.ToList();
            }
        }

        /// <summary>
        /// Gets the Role by it's unique Id
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        /// <returns></returns>
        public IRole GetRole(Guid roleId)
        {
            using (var context = CreateContext)
            {
                return context.Roles.SingleOrDefault(x => x.RoleId == roleId);
            }
        }

        /// <summary>
        /// Gets the Role by it's unique name
        /// </summary>
        /// <param name="name">The Role name.</param>
        /// <returns>
        /// The Role name
        /// </returns>
        public IRole GetRole(string name)
        {
            using (var context = CreateContext)
            {
                return context.Roles.SingleOrDefault(x => x.RoleName == name);
            }
        }

        /// <summary>
        /// Finds the Roles, optionally filtered by organization and other options.
        /// </summary>
        /// <param name="search">The search.</param>
        /// <returns>
        /// A list of matching Roles.
        /// </returns>
        public IEnumerable<IRole> FindRoles(string search)
        {
            using (var context = CreateContext)
            {
                return context.Roles.Where(r => r.RoleName.ToLower().Contains(search.ToLower()) ||
                                                r.Description.ToLower().Contains(search.ToLower())).ToList();
            }
        }

        /// <summary>
        /// Finds the users.
        /// </summary>
        /// <param name="search">The search.</param>
        /// <returns></returns>
        public IEnumerable<IUser> FindUsers(string search)
        {
            using (var context = CreateContext)
            {
                return context.Users.Where(u => u.FirstName.ToLower().Contains(search.ToLower()) ||
                                                u.LastName.ToLower().Contains(search.ToLower())).ToList();
            }
        }

        /// <summary>
        /// Finds the users with an email containing the provided string.
        /// </summary>
        /// <param name="search">The search term.</param>
        /// <returns>
        /// A list of matching users.
        /// </returns>
        public IEnumerable<IUser> FindUsersWithEmailAddress(string search)
        {
            using (var context = CreateContext)
            {
                return context.Users.Where(x => x.Email == search).ToList();
            }
        }

        /// <summary>
        /// Gets the memberships.
        /// </summary>
        /// <param name="userName">The name of the user.</param>
        /// <param name="withNesting">if set to <c>true</c> nested Roles are returned too.</param>
        /// <returns>
        /// A list of Roles the user is a member of, with inherited Roles if <paramref name="withNesting" /> is true
        /// </returns>
        /// <exception cref="System.NotSupportedException"></exception>
        public IEnumerable<IRole> GetMemberships(string userName, bool withNesting = false)
        {
            using (var context = CreateContext)
            {
                if (withNesting)
                {
                    throw new NotSupportedException();
                }
                var user = context.Users.SingleOrDefault(x => x.UserName == userName);
                return user == null ? new List<Role>() : user.Roles.ToList();
            }
        }

        /// <summary>
        /// Gets the memberships for the current user
        /// </summary>
        /// <returns></returns>
        public IEnumerable<IRole> GetMemberships()
        {
            return SecurityFactory.GetMemberships(SecurityFactory.GetCurrentUserName());
        }

        /// <summary>
        /// Updates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        public void UpdateUser(IUser user)
        {
            //get the user from before
            var beforeUser = SecurityFactory.GetUser(user.UserName);

            using (var context = CreateContext)
            {
                user.State = EntityState.Modified;

                // Assign role id, as it will be empty
                foreach (var role in user.Roles)
                {
                    role.RoleId = role.RoleId == Guid.Empty ? Guid.NewGuid() : role.RoleId;
                    if (role.State == EntityState.Deleted)
                    {
                        role.State = EntityState.Deleted;
                    }
                }

                // Update the entities in the context
                var entries = user.Roles.Union(new IStateEntity[] { user }).ToArray();

                foreach (var entry in entries)
                {
                    context.Entry(entry).State = entry.State;
                }

                context.SaveChanges();

                //raise the updated event
                RaisedUserUpdatedEvent(beforeUser, user);
            }
        }

        /// <summary>
        /// Updates the username of a user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="userName">The new username</param>
        public void UpdateUserName(IUser user, string userName)
        {
            if (user == null)
            {
                throw new ArgumentNullException("user");
            }

            if (string.IsNullOrEmpty(userName))
            {
                throw new ArgumentNullException("userName");
            }

            //get the user from before
            var beforeUser = GetUser(user.UserName);

            user.UserName = userName;

            SecurityFactory.UpdateUser(user);

            //raise the updated event
            RaisedUserNameUpdatedEvent(beforeUser, GetUser(userName));

        }

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public bool AuthenticateUser(string userName, string password)
        {
            var user = SecurityFactory.GetUser(userName);
            if (user == null)
            {
                return false;
            }

            //check password
            var result = Authenticate(user, password);

            //raise event
            if (result)
            {
                RaiseUserAuthenticatedEvent(user.UserName);
            }

            return result;
        }

        /// <summary>
        /// Authenticates the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        private bool Authenticate(IUser user, string password)
        {
            //check user is set
            if (user == null)
            {
                throw new ArgumentNullException("user");
            }

            if (string.IsNullOrEmpty(password))
            {
                return false;
            }

            using (var context = CreateContext)
            {
                if (!user.IsApproved)
                {
                    return false;
                }
                if (user.IsLockedOut)
                {
                    return false;
                }
                
                var hashedPassword = user.Password;
                var verificationSucceeded = (hashedPassword != null && Crypto.VerifyHashedPassword(hashedPassword, password));
                if (verificationSucceeded)
                {
                    user.PasswordFailuresSinceLastSuccess = 0;
                    user.LastLoginDate = DateTime.UtcNow;
                    user.LastActivityDate = DateTime.UtcNow;
                }
                else
                {
                    var failures = user.PasswordFailuresSinceLastSuccess;
                    if (failures < MaxInvalidPasswordAttempts)
                    {
                        user.PasswordFailuresSinceLastSuccess += 1;
                        user.LastPasswordFailureDate = DateTime.UtcNow;
                    }
                    else if (failures >= MaxInvalidPasswordAttempts)
                    {
                        user.LastPasswordFailureDate = DateTime.UtcNow;
                        user.LastLockoutDate = DateTime.UtcNow;
                        user.IsLockedOut = true;
                    }
                }
                user.State = EntityState.Modified;
                context.SaveChanges();
                return verificationSucceeded;
            }

            //return false;
        }

        /// <summary>
        /// Creates the Role.
        /// </summary>
        /// <param name="roleId">The Role id.</param>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        public IRole CreateRole(Guid roleId, string name)
        {
            var role = new Role {RoleId = roleId, RoleName = name, State = EntityState.Added };

            using (var context = CreateContext)
            {
                context.Roles.Add(role);
                context.SaveChanges();
            }

            return role;
        }

        /// <summary>
        /// Creates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        public string CreateUser(IUser user)
        {
            var password = RandomPassword();
            SecurityFactory.CreateUser(user, password);
            return password;
        }

        /// <summary>
        /// Creates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">The password.</param>
        /// <param name="forceReset">If set to <c>true</c> force the create user to reset their password on next login.</param>
        /// <returns></returns>
        public string CreateUser(IUser user, string password, bool forceReset = false)
        {
            // Small efficiency gain here, if you only force reset when True we save a UpdateUser call by not using the SetPassword overload
            if (forceReset) user.IsActive = false;

            // Call get User to ensure that the ID property is populated before going any further
            user = SecurityFactory.GetUser(user.UserName);

            // Set the Password
            SetPassword(user, password);

            //raise the user created event
            if (UserCreated != null)
            {
                UserCreated.Invoke(this, new UserCreatedEventArguments { User = user });
            }

            return password;
        }

        /// <summary>
        /// Creates the role.
        /// </summary>
        /// <param name="role">The role.</param>
        /// <param name="duplicateCheck">if set to <c>true</c> [duplicate check].</param>
        /// <exception cref="System.ApplicationException">Role already exists.</exception>
        public void CreateRole(IRole role, bool duplicateCheck = true)
        {
            if (!duplicateCheck) return;
            var existingRoles = SecurityFactory.FindRoles(role.RoleName);

            if (existingRoles.Any())
                throw new ApplicationException("Role already exists.");
        }

        public void CreateMembership(Guid roleId, Guid memberRoleId)
        {
            throw new NotImplementedException();
        }

        public void CreateMembership(Guid containerRoleId, string userName)
        {
            throw new NotImplementedException();
        }

        public void UpdateRole(IRole role)
        {
            throw new NotImplementedException();
        }

        public IUser CreateManager(string userName)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets the user name of the current user.
        /// </summary>
        /// <returns></returns>
        public string GetCurrentUserName()
        {
            var userName = string.Empty;

            if (HostingEnvironment.IsHosted)
            {
                userName = GetUserNameFromThreadIdentity();
            }

            // Ensure a username is returned
            if (!string.IsNullOrEmpty(userName)) { return userName; }

            var current = HttpContext.Current;

            return current != null ? EnsureUserName(current.User.Identity.Name) : GetUserNameFromThreadIdentity();
        }

        public void RemoveMembership(string roleSourceId, string userSourceId)
        {
            throw new NotImplementedException();
        }

        public void RemoveMembership(Guid roleId, Guid memberRoleId)
        {
            throw new NotImplementedException();
        }

        public void RemoveMembership(IRole role, IUser user)
        {
            throw new NotImplementedException();
        }

        public void RemoveMembership(Guid roleId, string userName)
        {
            throw new NotImplementedException();
        }

        public void RemoveAllMemberships(Guid roleId)
        {
            throw new NotImplementedException();
        }

        public IUser GetUserBySourceId(string userSourceId)
        {
            throw new NotImplementedException();
        }

        public IUser GetUserByEmployeeId(string userEmployeeId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IRole> GetRolesByName(string name)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IRole> GetRoleMembers(Guid roleId, string searchText)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Sets the password.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="newPassword">The text.</param>
        /// <param name="forceReset">Whether to force reset on next login</param>
        public void SetPassword(IUser user, string newPassword, bool forceReset = false)
        {
           user.PasswordExpired = forceReset;
           SetPassword(user, newPassword);
        }

        /// <summary>
        /// Sets the password.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">The password.</param>
        /// <exception cref="System.ApplicationException"></exception>
        public void SetPassword(IUser user, string password)
        {
            try
            {
                var hashedPassword = Crypto.HashPassword(password);
                if (hashedPassword.Length > 128)
                {
                    return;
                }

                user.Password = hashedPassword;

                SecurityFactory.UpdateUser(user);

                RaiseUserPasswordUpdatedEvent(user, password);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(string.Format("An error occured updating the password for user '{0}'", user.UserName), ex);
            }
        }

        public string SetPassword(IUser user, bool forceReset = false)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Determines whether the user is in a given role
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="roleId">The Role id.</param>
        /// <returns></returns>
        public bool IsUserMemberOf(IUser user, Guid roleId)
        {
            using (var context = CreateContext)
            {
                var q = context.Users.SingleOrDefault(x => x.UserId == user.UserId);
                return q != null && q.Roles.Any(r => r.RoleId == roleId);
            }
        }

        public IEnumerable<ISecurityEntity> GetMembersInRole(IRole role, string search = "")
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ISecurityEntity> GetUserMembersInRole(Guid roleId, string search)
        {
            throw new NotImplementedException();
        }

        public Dictionary<Guid, IRole> GetRoles()
        {
            throw new NotImplementedException();
        }

        public void DeleteRole(IRole role)
        {
            throw new NotImplementedException();
        }

        public void DeleteUser(IUser user)
        {
            throw new NotImplementedException();
        }

        public void LeaveUser(IUser user)
        {
            throw new NotImplementedException();
        }

        public void CreateMembership(IRole containerRole, ISecurityEntity member)
        {
            throw new NotImplementedException();
        }

        public bool CanManageUser(string userName)
        {
            throw new NotImplementedException();
        }

        public bool CanManageRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IRole> GetRoleByName(string name)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IRole> GetRolesByOwner()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IRole> GetRolesByOwner(ISecurityEntity user)
        {
            throw new NotImplementedException();
        }

        public void RemoveAllMemberships(IUser user)
        {
            throw new NotImplementedException();
        }

        public bool CanManageRole(IRole role)
        {
            throw new NotImplementedException();
        }

        public IUser GetUser(Guid id)
        {
            using (var context = CreateContext)
            {
                var user =  context.Users.SingleOrDefault(x => x.UserId == id);
                return user;
            }
        }

        public IEnumerable<IUser> GetUser(Guid[] ids)
        {
            throw new NotImplementedException();
        }

        public Claim[] GetClaims(IUser user)
        {
            throw new NotImplementedException();
        }

        public IPrincipal GetPrincipal(SecurityIdentifier sid)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IUser> GetRoleUserMembers(IRole role, string search)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Raises the user updated event.
        /// </summary>
        /// <param name="beforeUser">The before user.</param>
        /// <param name="afterUser">The after user.</param>
        private void RaisedUserUpdatedEvent(IUser beforeUser, IUser afterUser)
        {
            if (UserUpdated == null) return;
            var e = new UserUpdatingEventArgs {BeforeUser = beforeUser, AfterUser = afterUser};
            UserUpdated(this, e);
        }

        /// <summary>
        /// Raises the user updated event.
        /// </summary>
        /// <param name="beforeUser">The before user.</param>
        /// <param name="afterUser">The after user.</param>
        private void RaisedUserNameUpdatedEvent(IUser beforeUser, IUser afterUser)
        {
            if (this.UserNameUpdated == null) return;
            var e = new UserUpdatingEventArgs {BeforeUser = beforeUser, AfterUser = afterUser};
            UserUpdated(this, e);
            UserNameUpdated(this, e); // Allows other classes to know about the change, i.e. Caches
        }

        /// <summary>
        /// Gets the user name from thread identity.
        /// </summary>
        /// <returns></returns>
        private static string GetUserNameFromThreadIdentity()
        {
            if ((Thread.CurrentPrincipal != null) && (Thread.CurrentPrincipal.Identity != null))
            {
                return EnsureUserName(Thread.CurrentPrincipal.Identity.Name);
            }

            return string.Empty;
        }

        /// <summary>
        /// Checks if a username contains a domain prefix attached and removes it
        /// </summary>
        /// <returns></returns>
        private static string EnsureUserName(string username)
        {
            if (username == null)
            {
                return string.Empty;
            }

            //check if username contains domain name prefix
            var domainSlashIndex = username.IndexOf(@"\");
            return domainSlashIndex > 0 ? username.Substring(domainSlashIndex + 1) : username;
        }

        /// <summary>
        /// Raises the user password updated event.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">The password.</param>
        private void RaiseUserPasswordUpdatedEvent(IUser user, string password)
        {
            if (UserPasswordUpdated == null) return;
            var e = new UserPasswordChangedEventArgs(user.UserId, password);
            UserPasswordUpdated(this, e);
        }

        /// <summary>
        /// Raises the user authenticated event.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        protected void RaiseUserAuthenticatedEvent(string userName)
        {
            if (UserAuthenticated != null)
            {
                UserAuthenticated.Invoke(this, new UserAuthenticatedEventArgs(userName));
            }
        }

        /// <summary>
        /// Generates a random password
        /// </summary>
        /// <returns></returns>
        protected virtual string RandomPassword()
        {
            var pb = new StringBuilder();
            foreach (var c in Membership.GeneratePassword(30, 0))
            {
                if (char.IsLetterOrDigit(c))
                    pb.Append(c);

                if (pb.Length > 7)
                    break;
            }
            return pb.ToString();
        }
    }
}
