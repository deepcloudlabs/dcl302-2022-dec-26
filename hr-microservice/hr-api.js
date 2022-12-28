const {api} = require("./hr-api-config");

//region MongoDB and Mongoose
const {set, connect, Schema, model, Types} = require("mongoose");
const {tcKimlikNoValidator, ibanValidator, NO_IMAGE} = require("./validation");
set('strictQuery', true);
connect("mongodb://127.0.0.1:27017/hrdb", {
        "socketTimeoutMS": 0,
        "keepAlive": true,
        "useUnifiedTopology": true
    }, () => console.log("Connected to MongoDB...")
);

const employeeSchema = new Schema({
    "_id": Schema.Types.ObjectId,
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    "identityNo": {
        type: String,
        required: true,
        unique: true,
        validate: [tcKimlikNoValidator, "You must provide a valid identity no!"]
    },
    "photo": {
        type: String,
        required: false,
        default: NO_IMAGE
    },
    "salary": {
        type: Number,
        required: true,
        min: 2000,
        default: 2000
    },
    "iban": {
        type: String,
        required: true,
        unique: true,
        validate: [ibanValidator, "You must provide a valid iban!"]
    },
    "department": {
        type: String,
        required: false,
        default: "IT",
        enum: ["IT", "Sales", "Finance", "HR"]
    }
});

const Employee = model("employees", employeeSchema);
//endregion

//region POST /hr/api/v1/employees
api.post("/hr/api/v1/employees", (req, res) => {
    const employeeBody = req.body;
    employeeBody._id = new Types.ObjectId();
    const employee = new Employee(employeeBody);
    employee.save((err, result) => {
        res.set("Content-Type", "application/json");
        if (err) {
            res.status(400).send({"status": err});
        } else {
            res.status(200).send({"status": "OK"});
        }
    })
});
//endregion

//region GET /hr/api/v1/employees/11111111110
api.get("/hr/api/v1/employees/:identity", (req, res) => {
    const identity = req.params.identity;
    Employee.findOne(
        {"identityNo": identity},
        {},
        (err, emp) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else if (emp) {
                res.status(200).send(emp);
            } else {
                res.status(404).send({"status": "NOT FOUND"});
            }
        })
});
//endregion

//region GET /hr/api/v1/employees?page=3&size=15
api.get("/hr/api/v1/employees", (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.size || 10;
    const skip = page * limit;
    Employee.find(
        {},
        {},
        {skip, limit},
        (err, employees) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else {
                res.status(200).send(employees);
            }
        })
});
//endregion

//region DELETE /hr/api/v1/employees/11111111110
api.delete("/hr/api/v1/employees/:identity", (req, res) => {
    const identity = req.params.identity;
    Employee.findOneAndDelete(
        {"identityNo": identity},
        {},
        (err, emp) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else if (emp) {
                res.status(200).send(emp);
            } else {
                res.status(404).send({"status": "NOT FOUND"});
            }
        })
});
//endregion
// http://localhost:8100/api-docs
api.listen(8100, () => {
    console.log("HR Application is running...REST Api serving at port 8100");
});