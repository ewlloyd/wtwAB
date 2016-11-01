using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Web.Http;
using AddressBookApi.Data;
using AddressBookApi.Models;

namespace AddressBookApi.Controllers
{
    public class AddressController : ApiController
    {
        private IContactRepository Book { get; }

        public AddressController(IContactRepository book)
        {
            Book = book;
        }

        // GET: api/Address
        public IEnumerable<Contact> Get()
        {
            return Book.All;
        }

        // GET: api/Address/5
        public Contact Get(int id)
        {
            return Book[id];
        }

        // POST: api/Address
        public HttpResponseMessage Post([FromBody] Contact value)
        {
            var newValue = Book.Add(value);
            var ret = Request.CreateResponse(HttpStatusCode.Created);
            ret.Headers.Location = new Uri($"{Request.RequestUri}/{newValue.Id}");
            return ret;
        }

        // PUT: api/Address/5
        public void Put(int id, [FromBody] Contact value)
        {
            Book.Update(value);
        }

        // DELETE: api/Address/5
        public void Delete(int id)
        {
            Book.Remove(id);
        }

        // Location handling:
        [Route("api/address/{contactId}/{locationId}")]
        [HttpDelete]
        public void DeleteLocation(int contactId, int locationId)
        {
            Book.RemoveLocation(contactId, locationId);
        }

        [Route("api/address/{contactId}/{locationId}")]
        [HttpPut]
        public Location SaveLocation(int contactId, [FromBody] Location location)
        {
            return Book.UpdateLocation(contactId, location);
        }

        [Route("api/address/{contactId}/{locationId}")]
        [HttpPost]
        public Location AddLocation(int contactId, [FromBody] Location location)
        {
            return Book.AddLocation(contactId, location);
        }
    }
}