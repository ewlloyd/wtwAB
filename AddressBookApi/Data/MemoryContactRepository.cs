using System;
using System.Collections.Generic;
using AddressBookApi.Models;

namespace AddressBookApi.Data
{
    public class MemoryContactRepository : IContactRepository
    {
        private static Random IdBroker { get; } = new Random(DateTime.Now.Millisecond);

        protected virtual IDictionary<int, Contact> Book { get; } = new Dictionary<int, Contact>();
        protected virtual void Commit() { /*noop*/ }

        public IEnumerable<Contact> All => Book.Values;

        public Contact Add(Contact contact)
        {
            if (contact.Id == default(int))
                contact.Id = BrokerId();
            Book.Add(contact.Id, contact);
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

        protected int BrokerId()
        {
            int ret;
            do
            {
                ret = IdBroker.Next(1, int.MaxValue);
            } while (Book.ContainsKey(ret));
            Commit();
            return ret;
        }
    }
}