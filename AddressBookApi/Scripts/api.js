class Api {
    static buildUrl(contactId, locationId) {
        if (contactId) {
            return locationId
                ? `/api/Address/${contactId}/${locationId}`
                : `/api/Address/${contactId}`;
        } else {
            return "/api/Address";
        }
    }
    static getAddressBook() {
        return $.getJSON(this.buildUrl());
    }

    static getContact(contactId) {
        return $.getJSON(this.buildUrl(contactId));
    }

    static getLocation(contactId, locationId) {
        return $.getJSON(this.buildUrl(contactId, locationId));
    }

    static saveContact(contact) {
        return $.ajax({
            type: contact.id ? "PUT" : "POST",
            url: this.buildUrl(contact.id),
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(contact)
        });
    }

    static saveLocation(contactId, location) {
        if (!contactId)
            throw "Location must be associated with a contact";

        return $.ajax({
            type: location.id ? "PUT" : "POST",
            url: this.buildUrl(contactId, location.id),
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(location)
        });
    }

    static deleteContact(contactId) {
        return $.ajax({
            type: "DELETE",
            url: this.buildUrl(contactId)
        });
    }

    static deleteLocation(contactId, locationId) {
        return $.ajax({
            type: "DELETE",
            url: this.buildUrl(contactId, locationId)
        });
    }
}