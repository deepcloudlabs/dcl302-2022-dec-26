class Employee {
    #_identity;
    #_fullname;
    #_salary;
    #_iban;
    #_department;

    constructor(identity, fullname, salary, iban, department) {
        this.#_identity = identity;
        this.#_fullname = fullname;
        this.#_salary = salary;
        this.#_iban = iban;
        this.#_department = department;
        //this.increaseSalary = this.increaseSalary.bind(this);
    }

    increaseSalary = () => {
        console.log(this)
        this.#_salary = 2 * this.#_salary;
    }

    get salary() {
        return this.#_salary;
    }
}

const jack = new Employee("1", "jack bauer", 100_000,
    "tr1", "IT");
console.log(jack.salary)
jack.increaseSalary(); // increaseSalary(jack)
console.log(jack.salary)
setInterval(jack.increaseSalary, 3_000)
setInterval(function () {
    console.log(jack.salary);
}, 2_000)

