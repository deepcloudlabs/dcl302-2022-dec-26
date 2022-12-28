const express = require("express");
const api = express();
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerApiDoc = require("./resources/swagger-hr.json");

api.use(logger("dev"));
api.use(cors({origin: "*"}));
api.use(bodyParser.json({limit: "16mb"}))
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerApiDoc));

exports.api = api;