const express = require("express"),
  bodyParser = require("body-parser"),
  authController = require("./controllers/auth.controller");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static("static"));

authController(app);

app.listen(4201);
