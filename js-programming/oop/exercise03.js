// OOP: Class & Object -> encapsulation, information hiding?
// 1. function
// 3. function + information hiding
let Customer = (function (_identity, _firstName, _lastName, _email, _sms) {
    let identity = _identity;
    let firstName = _firstName;
    let lastName = _lastName;
    let email = _email;
    let sms = _sms;

    return {
        greetCustomer() {
            console.log(`Hello, ${lastName}!`);
        },
        getIdentity() {
            return identity;
        },
        getEmail() {
            return email;
        },
        setEmail(_email) {
            email = _email;
        }
    }
});

const kate = Customer("1", "kate", "austen", "kate@example.com", "+90-533-333-3333");
kate.greetCustomer();
console.log(kate.getIdentity())
console.log(kate.getEmail())
kate.setEmail("kate.austen@example.com")
console.log(kate.getEmail())
