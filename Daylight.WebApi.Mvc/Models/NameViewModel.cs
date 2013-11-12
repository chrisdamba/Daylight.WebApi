using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class NameViewModel
    {
        public NameViewModel()
        {
        }

        public NameViewModel(Name name)
        {
            this.Id = name.Id;
            this.GivenName = name.GivenName;
            this.MiddleName = name.MiddleName;
            this.FamilyName = name.FamilyName;
            this.Type = name.Type;
            this.Prefix = name.Prefix;
            this.Suffix = name.Suffix;
            this.Degree = name.Degree;
        }

        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        [Required]
        [StringLength(50)]
        public string GivenName { get; set; }

        [DataMember]
        [Required]
        [StringLength(50)]
        public string FamilyName { get; set; }

        [DataMember]
        public string MiddleName { get; set; }

        [DataMember]
        public string Type { get; set; }

        [DataMember]
        public string Prefix { get; set; }

        [DataMember]
        public string Suffix { get; set; }

        [DataMember]
        public string Degree { get; set; }
    }
}
