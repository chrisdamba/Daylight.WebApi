using System;
using System.Data.Spatial;
using System.Runtime.Serialization;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Mvc.Models
{
    [DataContract]
    public class AddressViewModel
    {
        public AddressViewModel()
        {
        }

        public AddressViewModel(Address address)
        {
            this.AddressType = address.Type;
            this.AreaLocality = address.AreaLocality;
            this.Id = address.AddressId;
            this.City = address.City;
            this.Country = address.Country;
            this.District = address.District;
            this.GeoLocation = address.GeoLocation;
            this.Province = address.Province;
            this.Street = address.Street;
        }
        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public string AddressType { get; set; }

        [DataMember]
        public string Street { get; set; }

        [DataMember]
        public string AreaLocality { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string District { get; set; }

        [DataMember]
        public string Province { get; set; }

        [DataMember]
        public string Country { get; set; }

        [DataMember]
        public DbGeography GeoLocation { get; set; }
    }
}
