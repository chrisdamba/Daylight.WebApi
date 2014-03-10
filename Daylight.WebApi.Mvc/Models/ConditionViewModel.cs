using System;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;


namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class ConditionViewModel
    {
        private MedicationViewModel[] medications;
        /// <summary>
        /// Initializes a new instance of the <see cref="ConditionViewModel" /> class.
        /// </summary>
        public ConditionViewModel()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ConditionViewModel" /> class.
        /// </summary>
        /// <param name="condition">The patient condition entity.</param>
        public ConditionViewModel(Condition condition)
        {
            this.Id = condition.ConditionId;
            this.PatientId = condition.PatientId;
            this.ConceptId = condition.ConceptId;
            this.Name = condition.Name;
            this.StartedAt = condition.StartedAt;
            this.FinishedAt = condition.FinishedAt;
            this.Medications = condition.Medications.Select(m => new MedicationViewModel(m)).ToArray();
        }

        /// <summary>
        /// Gets or sets the medications.
        /// </summary>
        [DataMember]
        public MedicationViewModel[] Medications
        {
            get { return medications ?? new MedicationViewModel[0]; }
            set { medications = value; }
        }

        /// <summary>
        /// Gets or sets the patient condition id.
        /// </summary>
        [DataMember]
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the patient id.
        /// </summary>
        [DataMember]
        public Guid PatientId { get; set; }

        /// <summary>
        /// Gets or sets the patient condition SNOMED concept id.
        /// </summary>
        [DataMember]
        public int ConceptId { get; set; }

        /// <summary>
        /// Gets or sets the patient condition name.
        /// </summary>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets when the patient condition started.
        /// </summary>
        [DataMember]
        public DateTime StartedAt { get; set; }

        /// <summary>
        /// Gets or sets when the patient condition ended/treated.
        /// </summary>
        [DataMember]
        public DateTime? FinishedAt { get; set; }

        public Condition ToEntity(Condition condition)
        {
            if (condition == null)
            {
                condition = new Condition {State = EntityState.Added, StartedAt = DateTime.Now};
            }
            else
            {
                condition.State = EntityState.Modified;
                condition.StartedAt = StartedAt;
            }

            // Populate properties
            condition.ConceptId = ConceptId;
            condition.PatientId = PatientId;
            condition.Name = Name;
            condition.FinishedAt = FinishedAt;

            return condition;
        }
    }
}