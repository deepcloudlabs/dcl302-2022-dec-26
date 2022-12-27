class Customer {
    constructor(identity, firstName, lastName, email, sms) {
        this.identity = identity;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.sms = sms;
    }
}

exports.Customer = Customer;