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
        validate: [ibanValidator, "You must provide a valid iban!"]
    },
    "department": {
        type: String,
        required: false,
        default: "IT",
        enum: ["IT", "Sales", "Finance", "HR"]
    }
});

const Employee = model("employees",employeeSchema);
//endregion

//region REST API
api.post("/hr/api/v1/employees", (req,res) => {
    const employeeBody = req.body;
    employeeBody._id = new Types.ObjectId();
    const employee = new Employee(employeeBody);
    employee.save((err,result)=>{
        res.set("Content-Type", "application/json");
        if (err){
            res.status(400).send({"status": err});
        } else {
            res.status(200).send({"status": "OK"});
        }
    })
});
//endregion

// http://localhost:8100/api-docs
api.listen(8100, () => {
    console.log("HR Application is running...REST Api serving at port 8100");
});