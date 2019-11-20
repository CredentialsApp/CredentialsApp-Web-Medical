const Note = require("../models/note.model");

exports.create = (req, res) => {
	// Create a note
	const note = new Note({
		patient: req.body.patient,
		note: req.body.note
	});

	// Save note in the database
	note
		.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Something wrong while creating the note."
			});
		});
};

exports.findAll = (req, res) => {
	Note.find()
		.then(notes => {
			res.send(notes);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Something wrong while retrieving notes."
			});
		});
};

// Update a note
exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		return res.status(400).send({
			message: "Patient content can not be empty"
		});
	}
	// Find and update patient with the request body
	Note.findByIdAndUpdate(
		req.body._id,
		{
			note: req.body.note
		},
		{ new: true }
	)
		.then(note => {
			if (!note) {
				return res.status(404).send({
					message: "note not found with id " + req.body._id
				});
			}
			res.send(note);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "patient not found with id " + req.params._id
				});
			}
			return res.status(500).send({
				message: "Something wrong updating note with id " + req.params._id
			});
		});
};
