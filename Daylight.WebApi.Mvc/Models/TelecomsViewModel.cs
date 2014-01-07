
using System.Data;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class TelecomsViewModel
    {
        public TelecomsViewModel()
        {
        }

        public TelecomsViewModel(Telecom telecom)
        {
            this.TelecomType = telecom.TelecomType;
            this.PreferenceOrder = telecom.PreferenceOrder;
            this.Use = telecom.Use;
            this.Value = telecom.Value;
        }

        [DataMember]
        public string TelecomType { get; set; }

        [DataMember]
        public string Use { get; set; }

        [DataMember]
        public string Value { get; set; }

        [DataMember]
        public int? PreferenceOrder { get; set; }

        public Telecom ToEntity(Telecom telecom)
        {
            // Create telecom if doesn't exist
            if (telecom == null)
            {
                telecom = new Telecom { State = EntityState.Added };
            }
            else
            {
                telecom.State = EntityState.Modified;
            }

            telecom.TelecomType = TelecomType;
            telecom.PreferenceOrder = (short?) PreferenceOrder;
            telecom.Use = Use;
            telecom.Value = Value;
            return telecom;
        }
    }
}
