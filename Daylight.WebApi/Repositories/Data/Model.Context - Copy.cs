﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Daylight.WebApi.Repositories.Data
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using Daylight.WebApi.Contracts.Entities;

    public partial class DaylightDataContext : DbContext
    {
        public DaylightDataContext()
            : base("name=DaylightDataContext")
        {
            Configuration.ProxyCreationEnabled = false;
        }

        public DaylightDataContext(string connectionString)
            : base(connectionString)
        {
            Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Condition> Conditions { get; set; }
        public DbSet<Medication> Medications { get; set; }
    }
}
