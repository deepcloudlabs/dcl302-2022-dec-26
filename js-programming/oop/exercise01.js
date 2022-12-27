// OOP: Class & Object -> encapsulation, information hiding?
// 1. function
let Customer = function(identity, firstName, lastName, email, sms){
    this.identity = identity;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.sms = sms;

    this.greetCustomer = function(){
        console.log(`Hello, ${this.lastName}!`);
    }
}

const kate = new Customer("1", "kate", "austen", "kate@example.com", "+90-533-333-3333");
kate.greetCustomer();
console.log(kate.identity)
kate.identity = "2";
console.log(kate.identity)
