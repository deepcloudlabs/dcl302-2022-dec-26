const {api} = require("./hr-api-config");
const updatableFields = ["photo", "salary", "iban", "fullname", "department", "fulltime"];

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
    "birthYear": {
        type: Number,
        required: true,
        min: 1950
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
    },
    "fulltime": {
        type: Boolean,
        required: false,
        default: true
    }
});

const Employee = model("employees", employeeSchema);
//endregion

//region KAFKA CONFIGURATION
const {Kafka, Partitioners} = require("kafkajs");
const kafka = new Kafka({
    clientId: "hr-backend-producer",
    brokers: ["127.0.0.1:9092"]
});
const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});

producer.connect()
    .then(() => console.log("Connected to the Kafka broker successfully."))
    .catch(err => console.error(err));

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
                const empHiredEvent = {
                    eventType: "EMPLOYEE_HIRED_EVENT",
                    eventData: employeeBody
                }
                let empHiredEventAsJson = JSON.stringify(empHiredEvent);
                sessions.forEach(session => {
                    session.emit("hr-events", empHiredEventAsJson);
                });
                producer.send({
                    topic: "hr-events",
                    messages: [
                        {"key": employeeBody.identityNo, "value": empHiredEventAsJson}
                    ]
                }).then(() => {
                    console.log("Event has been successfully sent.")
                }).catch(err => console.error(err));
            }
        }
    )
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
                let {_doc} = {...emp};
                let {photo, _id, __v, ...eventData} = _doc;
                console.log(eventData);
                const empFiredEvent = {
                    eventType: "EMPLOYEE_FIRED_EVENT",
                    eventData
                }
                let empFiredEventAsJson = JSON.stringify(empFiredEvent);
                sessions.forEach(session => {
                    session.emit("hr-events", empFiredEventAsJson);
                });
                producer.send({
                    topic: "hr-events",
                    messages: [
                        {"key": identity, "value": empFiredEventAsJson}
                    ]
                }).then(() => {
                    console.log("Event has been successfully sent.")
                }).catch(err => console.error(err));
            } else {
                res.status(404).send({"status": "NOT FOUND"});
            }
        })
});

//endregion

function updateEmployee(req, res) {
    const identity = req.params.identity;
    const employeeBody = req.body;
    const updatableEmployee = {};
    for (const [field, value] of Object.entries(employeeBody)) {
        if (updatableFields.includes(field))
            updatableEmployee[field] = value;
    }
    Employee.updateOne(
        {"identityNo": identity},
        {$set: updatableEmployee},
        {"upsert": false},
        (err, result) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else {
                res.status(200).send({"status": result});
            }
        })
}

//region PUT /hr/api/v1/employees/11111111110
api.put("/hr/api/v1/employees/:identity", (req, res) => {
    updateEmployee(req, res);
});
//endregion

//region PATCH /hr/api/v1/employees/11111111110
api.patch("/hr/api/v1/employees/:identity", (req, res) => {
    updateEmployee(req, res);
});
//endregion
const {Server} = require("socket.io");
const io = new Server(8200, {cors: {origin: "*"}});
const sessions = [];

io.on("connection", session => {
    console.log(`New websocket connection is created: ${session.id}`);
    sessions.push(session);
    io.on("disconnect", () => {
        console.log(`Websocket connection is closed: ${session.id}`);
        sessions.splice(0,
            sessions.length,
            sessions.filter(_session => _session.id !== session.id)
        );
    });
});
// http://localhost:8100/api-docs
api.listen(8100, () => {
    console.log("HR Application is running...REST Api serving at port 8100");
});