class Employee {
    constructor() {
        this.identityNo = ko.observable("51203761038");
        this.fullname = ko.observable("james sawyer");
        this.iban = ko.observable("TR440006296293449422424167");
        this.photo = ko.observable(AppConfig.NO_IMAGE);
        this.birthYear = ko.observable(1995);
        this.salary = ko.observable(100000)
        this.department = ko.observable("IT");
        this.fulltime = ko.observable(true);
    }

    update = (emp) => {
        for (let field in this) {
            if (emp.hasOwnProperty(field)) {
                let prop = this[field];
                if (ko.isObservable(prop))
                    prop(emp[field]);
                else
                    prop = emp[field];
            }
        }
    }
    update_es7 = (emp) => {
        Object.entries(this)
            .filter(entry => emp.hasOwnProperty(entry[0]))
            .forEach(entry => {
                let key = entry[0];
                let value = entry[1];
                if (ko.isObservable(value))
                    value(emp[key]);
                else
                    value = emp[key];
            });
    }
}

class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        this.totalSalary = ko.computed(() => { // Vuejs
            console.log("Computing total salary.")
            return this.employees().map(emp => Number(emp.salary))
                .reduce((sum, salary) => sum + salary, 0);
        })
        this.fileData = ko.observable({
            dataUrl: ko.observable(AppConfig.NO_IMAGE)
        })
        this.socket = io(AppConfig.WEBSOCKET_URL)
        this.socket.on('connect', () => {
            toastr.success("Connected to the websocket server!");
            this.socket.on('hr-events', (frame) => {
                const event = JSON.parse(frame);
                const emp = event.eventData;
                switch (event.eventType) {
                    case "EMPLOYEE_HIRED_EVENT":
                        this.employees.push(emp);
                        toastr.success(`${emp.fullname} is hired!`);
                        break;
                    case "EMPLOYEE_FIRED_EVENT":
                        let filteredEmployees = this.employees().filter(e => e.identityNo != emp.identityNo);
                        this.employees(filteredEmployees);
                        toastr.success(`${emp.fullname} is fired!`);
                        break;
                }
            });
        })
    }

    findAll = () => {
        fetch(`${AppConfig.REST_API_BASE_URL}/employees`)
            .then(res => res.json())
            .then(employees => this.employees(employees))
            .catch(err => toastr.error(err))
    }

    findEmployeeByIdentity = () => {
        fetch(`${AppConfig.REST_API_BASE_URL}/employees/${this.employee.identityNo()}`)
            .then(res => res.json())
            .then(emp => {
                this.fileData().dataUrl(emp.photo == null ? AppConfig.NO_IMAGE : emp.photo);
                this.employee.update_es7(emp);
            })
            .catch(toastr.error)
    }

    hireEmployee = () => {
        let body = ko.toJS(this.employee);
        body.photo = this.fileData().dataUrl();
        fetch(
            `${AppConfig.REST_API_BASE_URL}/employees`,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({"Content-Type": "application/json"})
            }
        ).then(status => toastr.success("Employee is hired!"))
            .catch(toastr.error);
    }

    fireEmployee = () => {
        fetch(
            `${AppConfig.REST_API_BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: "DELETE",
                headers: new Headers({"Accept": "application/json"})
            }
        ).then(emp => emp.json())
            .then(emp => {
                toastr.success("Employee is fired!");
                this.fileData().dataUrl(emp.photo == null ? AppConfig.NO_IMAGE : emp.photo);
                this.employee.update_es7(emp);
            }).catch(toastr.error);
    }

    fireEmployeeAtRow = (row) => {
        fetch(
            `${AppConfig.REST_API_BASE_URL}/employees/${row.identityNo}`,
            {
                method: "DELETE",
                headers: new Headers({"Accept": "application/json"})
            }
        ).then(emp => emp.json())
            .then(emp => {
                toastr.success("Employee is fired!");
                this.fileData().dataUrl(emp.photo == null ? AppConfig.NO_IMAGE : emp.photo);
                this.employee.update_es7(emp);
            }).catch(toastr.error);
    }

    updateEmployee = () => {
        let body = ko.toJS(this.employee);
        body.photo = this.fileData().dataUrl();
        fetch(
            `${AppConfig.REST_API_BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: new Headers({"Content-Type": "application/json"})
            }
        ).then(status => {
            toastr.success("Employee is updated!");
            let filtered = this.employees().filter(e => e.identityNo != body.identityNo);
            filtered.push(body);
            this.employees(filtered);
        }).catch(toastr.error);
    }
};