class Employee {
    constructor({identity, fullname, salary, iban, department,photo,birthYear}) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        this.iban = iban;
        this.department = department;
        this.photo= photo;
        this.birthYear = birthYear;
    }

    increaseSalary = () => {
        this.salary = 2 * this.salary;
    }
}

const jack = new Employee(
    {
        identity: "1",
        fullname: "jack bauer",
        salary: 100_000,
        iban: "tr1",
        department: "IT",
        photo: null,
        birthYear: 1956
    });

jack.increaseSalary();
console.log(JSON.stringify(jack))