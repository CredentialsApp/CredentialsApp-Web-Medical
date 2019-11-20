const Patient = require("../models/patient.model");

exports.create = (req, res) => {
	// Create a Patient
	const patient = new Patient({
		name: req.body.name
	});

	// Save Patient in the database
	patient
		.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Something wrong while creating the patient."
			});
		});
};

exports.findAll = (req, res) => {
	Patient.find()
		.then(patients => {
			res.send(patients);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Something wrong while retrieving patients."
			});
		});
};

exports.findOne = (req, res) => {
	Patient.findById(req.params.patientId)
		.then(patient => {
			if (!patient) {
				return res.status(404).send({
					message: "Patient not found with id " + req.params.patientId
				});
			}
			res.send(patient);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Patient not found with id " + req.params.patientId
				});
			}
			return res.status(500).send({
				message:
					"Something wrong retrieving patient with id " + req.params.patientId
			});
		});
};

// Update a patient
exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		return res.status(400).send({
			message: "Patient content can not be empty"
		});
	}

	// Find and update patient with the request body
	Patient.findByIdAndUpdate(
		req.params.productId,
		{
			name: req.body.patient
		},
		{ new: true }
	)
		.then(patient => {
			if (!patient) {
				return res.status(404).send({
					message: "patient not found with id " + req.params.patientId
				});
			}
			res.send(patient);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "patient not found with id " + req.params.patientId
				});
			}
			return res.status(500).send({
				message:
					"Something wrong updating patient with id " + req.params.patientId
			});
		});
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	Patient.findByIdAndRemove(req.params.patientId)
		.then(patient => {
			if (!patient) {
				return res.status(404).send({
					message: "patient not found with id " + req.params.patientId
				});
			}
			res.send({ message: "patient deleted successfully!" });
		})
		.catch(err => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "patient not found with id " + req.params.patientId
				});
			}
			return res.status(500).send({
				message: "Could not delete product with id " + req.params.patientId
			});
		});
};
