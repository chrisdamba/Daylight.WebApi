using System;
using System.Data;
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
            this.Building = address.Building;
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
        public string Building { get; set; }

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

        public Address ToEntity(Address address)
        {
            // Create address if doesn't exist
            if (address == null)
            {
                address = new Address { State = EntityState.Added };
            }
            else
            {
                address.State = EntityState.Modified;
            }
            address.AreaLocality = AreaLocality;
            address.Building = Building;
            address.City = City;
            address.Country = Country;
            address.District = District;
            address.GeoLocation = GeoLocation;
            address.Province = Province;
            address.Type = AddressType;

            return address;
        }
    }
}
