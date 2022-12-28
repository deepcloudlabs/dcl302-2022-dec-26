const {api} = require("./hr-api-config");

//region MongoDB and Mongoose
const {set, connect, Schema, model} = require("mongoose");
const {tcKimlikNoValidator, ibanValidator} = require("./validation");
set('strictQuery', true);
connect("mongodb://127.0.0.1:27017/hrdb", {
        "socketTimeoutMS": 0,
        "keepAlive": true,
        "useUnifiedTopology": true
    }, () => console.log("Connected to MongoDB...")
);
const departmentSchema = new Schema({
    "name": {
        type: String,
        required: false,
        default: "IT",
        enum: ["IT", "Sales", "Finance", "HR"]
    }
});

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
        required: false
        // maxLength: 128000
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
    "department": departmentSchema
});

const Employee = model("employees",employeeSchema);
//endregion

// http://localhost:8100/api-docs
api.listen(8100, () => {
    console.log("HR Application is running...REST Api serving at port 8100");
});