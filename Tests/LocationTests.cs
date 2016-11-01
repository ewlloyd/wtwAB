using AddressBookApi.Data;
using AddressBookApi.Models;
using FluentAssertions;
using Xunit;

namespace Tests
{
    public class LocationTests
    {
        private const string FIRST_NAME = "Joe";
        private const string LAST_NAME = "Blaugh";

        private const string ADDRESS1 = "123 Main Street";
        private const string ADDRESS2 = "Apt. 321";
        private const string CITY = "Eugene";
        private const string STATE = "OR";
        private const string POSTAL_CODE = "97401";

        [Fact]
        public void CanAddLocation()
        {
            IContactRepository sut = new MemoryContactRepository();
            Contact added = sut.Add(new Contact
                                    {
                                        FirstName = FIRST_NAME,
                                        LastName = LAST_NAME
                                    });

            var location = sut.AddLocation(added.Id,
                                           new Location
                                           {
                                               Address1 = ADDRESS1,
                                               Address2 = ADDRESS2,
                                               City = CITY,
                                               State = STATE,
                                               PostalCode = POSTAL_CODE
                                           });

            sut[added.Id].Locations.Should().HaveCount(1);
            location.Address1.Should().BeEquivalentTo(ADDRESS1);
            location.Address2.Should().BeEquivalentTo(ADDRESS2);
            location.City.Should().BeEquivalentTo(CITY);
            location.State.Should().BeEquivalentTo(STATE);
            location.PostalCode.Should().BeEquivalentTo(POSTAL_CODE);
        }

        [Fact]
        public void CanDeleteLocation()
        {
            IContactRepository sut = new MemoryContactRepository();
            Contact added = sut.Add(new Contact
            {
                FirstName = FIRST_NAME,
                LastName = LAST_NAME
            });

            var location = sut.AddLocation(added.Id,
                                           new Location
                                           {
                                               Address1 = ADDRESS1,
                                               Address2 = ADDRESS2,
                                               City = CITY,
                                               State = STATE,
                                               PostalCode = POSTAL_CODE
                                           });

            sut.RemoveLocation(added.Id, location.Id);

            added.Locations.Should().HaveCount(0);
        }
    }
}