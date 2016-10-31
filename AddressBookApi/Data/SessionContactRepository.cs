using System.Collections.Generic;
using System.Web;
using AddressBookApi.Models;

namespace AddressBookApi.Data
{
    public class SessionContactRepository : MemoryContactRepository
    {
        private const string ADDRESS_BOOK = "AddressBook";

        protected sealed override IDictionary<int, Contact> Book => GetBook();

        private IDictionary<int, Contact> GetBook()
        {
            // Yeah, won't work except for in-process sessions. See what happens when you rush?
            var ret = (IDictionary<int, Contact>) HttpContext.Current.Session[ADDRESS_BOOK];

            if (ret == null)
            {
                HttpContext.Current.Session[ADDRESS_BOOK] = ret = new Dictionary<int, Contact>();
                SeedBook();
            }

            return ret;
        }

        protected sealed override void Commit()
        {
            HttpContext.Current.Session[ADDRESS_BOOK] = Book;
        }

        // Just for testing:
        private void SeedBook()
        {
            Add(new Contact
                {
                    FirstName = "Jake",
                    LastName = "Blues",
                    Locations =
                    {
                        new Location
                        {
                            Id = "Away",
                            Email = "jolietjake@jailmail.com",
                            Address1 = "Joliet Correctional Center",
                            Address2 = "1125 Collins St.",
                            City = "Joliet",
                            State = "IL",
                            PostalCode = "60432",
                            Phone = "(815) 724-4000"
                        }
                    }
                });
            Add(new Contact
                {
                    FirstName = "Elwood",
                    LastName = "Blues",
                    Locations =
                    {
                        new Location
                        {
                            Id = "Home",
                            Email = "elwoodblues@gmail.com",
                            Address1 = "1060 W. Addison St.",
                            City = "Chicago",
                            State = "IL",
                            PostalCode = "60613",
                            Phone = "(773) 404-2827"
                        },
                        new Location
                        {
                            Id = "Cell",
                            Phone = "(815) 555-2583"
                        }
                    }
                });

            Commit();
        }
    }
}