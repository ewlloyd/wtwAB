using System.Collections.Generic;

namespace AddressBookApi.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Location> Locations { get; set; } = new List<Location>();
    }
}