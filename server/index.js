const express = require("express"),
  bodyParser = require("body-parser"),
  authController = require("./controllers/auth.controller");
const cors = require("cors");
const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

authController(app);

app.listen(4201);
