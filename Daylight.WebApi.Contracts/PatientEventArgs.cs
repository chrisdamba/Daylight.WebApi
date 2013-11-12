using System;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts
{
    public class PatientEventArgs : EventArgs
    {
        private readonly Patient patient;

        private readonly Guid patientId;

        public bool Created { get; set; }

        public PatientEventArgs(Patient patient)
        {
            this.patient = patient;
        }

        public PatientEventArgs(Guid patientId)
        {
            this.patientId = patientId;
        }

        public Patient Patient
        {
            get { return patient; }
        }

        public Guid PatientId
        {
            get { return Patient != null ? Patient.PatientId : patientId; }
        }

    }
}
