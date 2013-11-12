using System;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class RelationshipViewModel
    {
        public RelationshipViewModel()
        {
        }

        public RelationshipViewModel(Relationship relationship)
        {
            GivenName = relationship.GivenName;
            FamilyName = relationship.FamilyName;
            MiddleName = relationship.MiddleName;
            Gender = relationship.Gender;
            Relationship = relationship.Type;
            Dependent = relationship.Dependent;
            Dob = relationship.DateOfBirth;
        }

        [DataMember]
        public string GivenName { get; set; }

        [DataMember]
        public string FamilyName { get; set; }

        [DataMember]
        public string MiddleName { get; set; }

        [DataMember]
        public string Gender { get; set; }

        [DataMember]
        public string Relationship { get; set; }

        [DataMember]
        public bool Dependent { get; set; }

        [DataMember]
        public DateTime Dob { get; set; }
    }
}
