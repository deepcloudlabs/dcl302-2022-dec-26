class Employee {
    constructor(identity, fullname, salary, iban, department) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        this.iban = iban;
        this.department = department;
    }

    increaseSalary = () => {
        this.salary = 2 * this.salary;
    }
}

const jack = new Employee("1", "jack bauer", 100_000,
    "tr1", "IT");

for (let p in jack) { // reflection
    if (typeof (jack[p]) === "function") {
        jack[p]();
    } else {
        console.log(`jack.${p}: ${jack[p]}`);
    }
}

for (let [p,v] of Object.entries(jack)){
    console.log(`jack.${p}: ${v}`);
}