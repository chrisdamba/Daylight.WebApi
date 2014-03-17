using System;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class VitalsViewModel
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="VitalsViewModel"/> class.
        /// </summary>
        public VitalsViewModel()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="VitalsViewModel"/> class.
        /// </summary>
        /// <param name="vital">The vital.</param>
        public VitalsViewModel(Vital vital)
        {
            ObservationId = vital.ObservationId;
            PatientId = vital.PatientId;
            DateRecorded = vital.DateRecorded;
            Pulse = vital.Pulse;
            BloodGlucose = vital.BloodGlucose;
            DiastolicBp = vital.DiastolicBP;
            SystolicBp = vital.SystolicBP;
            BodyTemperature = vital.BodyTemperature;
            Weight = vital.Weight;
            Height = vital.Height;
        }

        /// <summary>
        /// Gets or sets the observation identifier.
        /// </summary>
        /// <value>
        /// The observation identifier.
        /// </value>
        [DataMember]
        public Guid ObservationId { get; set; }

        /// <summary>
        /// Gets or sets the patient identifier.
        /// </summary>
        /// <value>
        /// The patient identifier.
        /// </value>
        [DataMember]
        public Guid PatientId { get; set; }

        /// <summary>
        /// Gets or sets the date the vitals are recorded.
        /// </summary>
        /// <value>
        /// The date recorded.
        /// </value>
        [DataMember]
        public DateTime DateRecorded { get; set; }

        /// <summary>
        /// Gets or sets the pulse rate.
        /// </summary>
        /// <value>
        /// The pulse.
        /// </value>
        [DataMember]
        public double? Pulse { get; set; }

        /// <summary>
        /// Gets or sets the blood glucose.
        /// </summary>
        /// <value>
        /// The blood glucose.
        /// </value>
        [DataMember]
        public double? BloodGlucose { get; set; }

        /// <summary>
        /// Gets or sets the diastolic blood pressure.
        /// </summary>
        /// <value>
        /// The diastolic bp.
        /// </value>
        [DataMember]
        public short? DiastolicBp { get; set; }

        /// <summary>
        /// Gets or sets the systolic blood pressure.
        /// </summary>
        /// <value>
        /// The systolic bp.
        /// </value>
        [DataMember]
        public short? SystolicBp { get; set; }

        /// <summary>
        /// Gets or sets the body temperature.
        /// </summary>
        /// <value>
        /// The body temperature.
        /// </value>
        [DataMember]
        public double? BodyTemperature { get; set; }

        /// <summary>
        /// Gets or sets the patient weight.
        /// </summary>
        /// <value>
        /// The weight.
        /// </value>
        [DataMember]
        public double? Weight { get; set; }

        /// <summary>
        /// Gets or sets the patient height.
        /// </summary>
        /// <value>
        /// The height.
        /// </value>
        [DataMember]
        public double? Height { get; set; }
    }
}