﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Daylight.WebApi.Contracts.Entities
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DaylightDataContext : DbContext
    {
        public DaylightDataContext()
            : base("name=DaylightDataContext")
        {
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
    
        public DbSet<Address> Addresses { get; set; }
        public DbSet<DeathReport> DeathReports { get; set; }
        public DbSet<Name> Names { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Relationship> Relationships { get; set; }
        public DbSet<Telecom> Telecoms { get; set; }
        public DbSet<Condition> Conditions { get; set; }
        public DbSet<Medication> Medications { get; set; }
        public DbSet<Procedure> Procedures { get; set; }
    }
}
