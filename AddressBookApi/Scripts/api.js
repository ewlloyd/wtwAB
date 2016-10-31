class Api {
    static buildUrl(id) {
        return id ? `/api/Address/${id}` : "/api/Address";
    }
    static getAddressBook() {
        return $.getJSON(this.buildUrl());
    }
    static getAddress(id) {
        return $.getJSON(this.buildUrl(id));
    }
    static saveAddress(address) {
        return $.ajax({
            type: address.id ? "PUT" : "POST",
            url: this.buildUrl(address.id),
            contentType: "application/json",
            dataType: "json",
            data: address
        });
    }
    static deleteAddress(address) {
        return $.ajax({
            type: "DELETE",
            url: this.buildUrl(address.id)
        });
    }
}