using System;
using System.CodeDom;
using System.Data;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class MedicationViewModel
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MedicationViewModel"/> class.
        /// </summary>
        public MedicationViewModel()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicationViewModel"/> class.
        /// </summary>
        /// <param name="medication">The medication.</param>
        public MedicationViewModel(Medication medication)
        {
            this.Id = medication.MedicationId;
            this.ConceptId = medication.ConceptId;
            this.ConditionId = medication.ConditionId;
            this.Name = medication.Name;
            this.FinishedAt = medication.FinishedAt;
            this.StartedAt = medication.StartedAt;
            this.Cost = medication.Cost;
            this.PatientId = medication.Condition.PatientId;
        }

        /// <summary>
        /// Gets or sets the patient condition id.
        /// </summary>
        [DataMember]
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the condition identifier.
        /// </summary>
        [DataMember]
        public Guid ConditionId { get; set; }

        /// <summary>
        /// Gets or sets the patient identifier.
        /// </summary>
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

        /// <summary>
        /// Gets or sets the medication cost.
        /// </summary>
        public decimal Cost { get; set; }

        /// <summary>
        /// Converts medication object to EF medication entity.
        /// </summary>
        /// <param name="medication">The medication.</param>
        /// <returns></returns>
        public Medication ToEntity(Medication medication)
        {
            if (medication == null)
            {
                medication = new Medication { State = EntityState.Added, StartedAt = DateTime.Now };
            }
            else
            {
                medication.State = EntityState.Modified;
                medication.StartedAt = StartedAt;
            }

            // Populate properties
            medication.ConceptId = ConceptId;
            medication.ConditionId = ConditionId;
            medication.Name = Name;
            medication.FinishedAt = FinishedAt;
            medication.Cost = Cost;

            return medication;
        }
    }
}