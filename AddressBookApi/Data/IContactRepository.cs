using System.Collections.Generic;
using AddressBookApi.Models;

namespace AddressBookApi.Data
{
    public interface IContactRepository
    {
        IEnumerable<Contact> All { get; }
        Contact Add(Contact contact);
        Contact Update(Contact contact);
        Contact Remove(int id);
        Contact this[int id] { get; }
        void RemoveLocation(int contactId, int locationId);
        Location AddLocation(int contactId, Location location);
        Location UpdateLocation(int contactId, Location location);
    }
}