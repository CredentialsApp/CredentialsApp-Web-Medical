module.exports = app => {
	const patient = require("./patient.controller");

	// Create a new Patient
	app.post("/api/insertPatient", patient.create);

	// Get all Notes
	app.get("/api/getAllPatients", patient.findAll);

	// Retrieve a single Patient with patient
	app.get("/api/patients/:patientId", patient.findOne);

	// Update a Patient with patientId
	app.put("/api/patients/:patientId", patient.update);

	// Delete a Patient with patientId
	app.delete("/api/patients/:patientId", patient.delete);
};
