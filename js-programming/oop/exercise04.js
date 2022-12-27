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

    get identity(){
        console.log("get identity() is working...")
        return this.#identity;
    }

    get email(){
        console.log("get email() is working...")
        return this.#email;
    }

    set email(email){
        console.log("set email() is working...")
        this.#email = email;
    }

    greetCustomer() {
        console.log(`Hello, ${this.#lastName}!`);
    }
}

const kate = new Customer("1", "kate", "austen", "kate@example.com", "+90-533-333-3333");
kate.greetCustomer();
console.log(kate.email)
kate.email = "kate.austen@example.com";
console.log(kate.email)
