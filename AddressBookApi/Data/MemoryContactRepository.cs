using System;
using System.Collections.Generic;
using System.Linq;
using AddressBookApi.Models;

namespace AddressBookApi.Data
{
    public class MemoryContactRepository : IContactRepository
    {
        private static Random IdBroker { get; } = new Random(DateTime.Now.Millisecond);

        protected virtual IDictionary<int, Contact> Book { get; } = new Dictionary<int, Contact>();

        protected virtual void Commit()
        {
            /* noop -- implemented in overrides */
        }

        public IEnumerable<Contact> All => Book.Values;

        public Contact Add(Contact contact)
        {
            if (contact.Id == default(int))
                contact.Id = BrokerContactId();
            Book.Add(contact.Id, contact);
            // KI: if contact.Locations contains duplicate non-zero Ids, we won't catch it here:
            foreach (var loc in contact.Locations)
            {
                if (loc.Id == default(int))
                    loc.Id = BrokerLocationId(contact);
            }
            Commit();
            return contact;
        }

        public Contact Update(Contact contact)
        {
            Remove(contact.Id);
            Add(contact);
            Commit();
            return contact;
        }

        public Contact Remove(int id)
        {
            var ret = Book[id];
            Book.Remove(id);
            Commit();
            return ret;
        }

        public Contact this[int id] => Book[id];

        protected int BrokerId(Func<int, bool> predicate)
        {
            int ret;
            do
            {
                ret = IdBroker.Next(1, int.MaxValue);
            } while (!predicate(ret));
            Commit();
            return ret;
        }

        protected int BrokerContactId()
        {
            return BrokerId(id => !Book.ContainsKey(id));
        }

        protected int BrokerLocationId(Contact contact)
        {
            return BrokerId(id => contact.Locations.All(loc => loc.Id != id));
        }

        public void RemoveLocation(int contactId, int locationId)
        {
            var contact = Book[contactId];
            var location = contact.Locations.Single(loc => loc.Id == locationId);
            contact.Locations.Remove(location);
            Commit();
        }

        public Location AddLocation(int contactId, Location location)
        {
            if (location == null)
                throw new ArgumentNullException(nameof(location));

            var contact = Book[contactId];
            location.Id = BrokerLocationId(contact);

            contact.Locations.Add(location);
            Commit();
            return location;
        }

        public Location UpdateLocation(int contactId, Location location)
        {
            if (location == null)
                throw new ArgumentNullException(nameof(location));

            var contact = Book[contactId];

            contact.Locations[location.Id] = location;
            Commit();
            return location;
        }
    }
}