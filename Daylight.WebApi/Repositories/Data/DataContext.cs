using System.Data.Entity;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Repositories.Data
{
    /// <summary>
    /// An implementation of <see cref="IDataContext"/>, which simply derives from <see cref="DaylightDataContext"/>.
    /// </summary>
    public class DataContext : DaylightDataContext, IDataContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DataContext"/> class.
        /// </summary>
        public DataContext()
            : base(DataContextUtility.CreateEdmxConnectionString("Repositories.Data.Model"))
        {
        }

        /// <summary>
        /// Gets the patient table.
        /// </summary>
        public IDbSet<Patient> Patients
        {
            get { return base.Patients; }
        }

        /// <summary>
        /// Gets the condition table.
        /// </summary>
        public IDbSet<Condition> Conditions
        {
            get { return base.Conditions; }
        }

        /// <summary>
        /// Gets the medication table.
        /// </summary>
        public IDbSet<Medication> Medications
        {
            get { return base.Medications; }
        }

        /// <summary>
        /// Gets the user table.
        /// </summary>
        public IDbSet<User> Users
        {
            get { return base.Users; }
        }

        /// <summary>
        /// Gets the role table.
        /// </summary>
        public IDbSet<Role> Roles
        {
            get { return base.Roles; }
        }

        /// <summary>
        /// Gets the vital table.
        /// </summary>
        public IDbSet<Vital> Vitals
        {
            get { return base.Vitals; }
        }

        /// <summary>
        /// Gets the event table.
        /// </summary>
        public IDbSet<Event> Events
        {
            get { return base.Events;  }
        }

        /// <summary>
        /// Gets the bill table.
        /// </summary>
        public IDbSet<Bill> Bills
        {
            get { return base.Bills; }
        }
        
        /// <summary>
        /// Gets the patient bill table.
        /// </summary>
        public IDbSet<PatientBill> PatientBills
        {
            get { return base.PatientBills; }
        }

        /// <summary>
        /// Gets the medical aid table.
        /// </summary>
        public IDbSet<MedicalAid> MedicalAids
        {
            get { return base.MedicalAids; }
        }

        /// <summary>
        /// Gets the medical aid member table.
        /// </summary>
        public IDbSet<MedicalAidMember> MedicalAidMembers
        {
            get { return base.MedicalAidMembers; }
        }

        /// <summary>
        /// Gets the payment table.
        /// </summary>
        public IDbSet<Payment> Payments
        {
            get { return base.Payments; }
        }

        /// <summary>
        /// Gets the payment method table.
        /// </summary>
        public IDbSet<PaymentMethod> PaymentMethods
        {
            get { return base.PaymentMethods; }
        }
    }
}
