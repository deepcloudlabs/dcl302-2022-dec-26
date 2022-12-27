// OOP: Class & Object -> encapsulation
// 2. class, constructor, information hiding (es12)
class Customer {
    #identity;
    #firstName;
    #lastName;
    #email;
    #sms;

    constructor(identity, firstName, lastName, email, sms) {
        this.#identity = identity;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#sms = sms;
    }

    get identity() {
        console.log("get identity() is working...")
        return this.#identity;
    }

    get email() {
        console.log("get email() is working...")
        return this.#email;
    }

    set email(email) {
        console.log("set email() is working...")
        this.#email = email;
    }

    greetCustomer() {
        console.log(`Hello, ${this.#lastName}!`);
    }
}

class GoldCustomer extends Customer {
    #birthYear;

    constructor(identity, firstName, lastName, email, sms, birthYear) {
        super(identity, firstName, lastName, email, sms);
        this.#birthYear = birthYear;
    }

    get birthYear() {
        return this.#birthYear;
    }
}

const kate = new GoldCustomer("1", "kate", "austen", "kate@example.com", "+90-533-333-3333", 1988);
kate.greetCustomer();
console.log(kate.email)
console.log(kate.birthYear)
