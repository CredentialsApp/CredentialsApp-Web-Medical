const express = require("express"),
	bodyParser = require("body-parser"),
	authController = require("./controllers/auth.controller"),
	patientRouteController = require("./controllers/patient.route.controller"),
	dbConfig = require("./config/database_config.js");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.Promise = global.Promise;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
authController(app);
patientRouteController(app);

mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch(err => {
		console.log("Could not connect to the database. Exiting now...", err);
		process.exit();
	});

app.listen(4201);
