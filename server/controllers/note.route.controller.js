module.exports = app => {
	const note = require("./note.controller");

	// Create a new Note
	app.post("/api/insertNote", note.create);

	// Get all Notes
	app.get("/api/getAllNotes", note.findAll);

	// Update a Note
	app.put("/api/updateNote", note.update);
};
