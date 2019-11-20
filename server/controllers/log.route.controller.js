module.exports = app => {
	const log = require("./log.controller");

	// Create a new Log
	app.post("/api/insertLog", log.create);

	// Get all Notes
	app.get("/api/getAllLogs", log.findAll);
};
