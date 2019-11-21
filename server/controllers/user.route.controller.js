module.exports = app => {
	const user = require("./user.controller");

	// Create a new User
	app.post("/api/insertUser", user.create);
};
