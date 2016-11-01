using System;
using AddressBookApi.Data;
using AddressBookApi.Models;
using FluentAssertions;
using Xunit;

namespace Tests
{
    public class AddressBookTests
    {
        [Fact]
        public void CanBeConstructed()
        {
            Action act = () =>
                         {
                             IContactRepository sut = new MemoryContactRepository();
                             sut.Should().BeAssignableTo<MemoryContactRepository>();
                         };
            act.ShouldNotThrow();
        }

        [Fact]
        public void CanAdd()
        {
            IContactRepository sut = new MemoryContactRepository();
            Contact added = sut.Add(new Contact
                                    {
                                        FirstName = "Joe",
                                        LastName = "Blaugh"
                                    });
            sut.All.Should().HaveCount(1);
            sut[added.Id].FirstName.ShouldBeEquivalentTo("Joe");
            sut[added.Id].LastName.ShouldBeEquivalentTo("Blaugh");
        }

        [Fact]
        public void CanRemove()
        {
            IContactRepository sut = new MemoryContactRepository();
            Contact added = sut.Add(new Contact
            {
                FirstName = "Joe",
                LastName = "Blaugh"
            });

            sut.Remove(added.Id);
            sut.All.Should().HaveCount(0);
        }

        [Fact]
        public void CanUpdate()
        {
            IContactRepository sut = new MemoryContactRepository();
            Contact added = sut.Add(new Contact
            {
                FirstName = "Joe",
                LastName = "Blaugh"
            });

            Contact updated = new Contact
                              {
                                  Id = added.Id,
                                  FirstName = "Jane",
                                  LastName = "Daugh"
                              };

            sut.Update(updated);

            sut.All.Should().HaveCount(1);
            sut[added.Id].FirstName.ShouldBeEquivalentTo("Jane");
            sut[added.Id].LastName.ShouldBeEquivalentTo("Daugh");
        }
    }
}
