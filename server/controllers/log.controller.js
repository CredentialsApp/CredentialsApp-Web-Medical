const Log = require("../models/log.model");

exports.create = (req, res) => {
	// Create a log
	const log = new Log({
		doctorName: req.body.doctorName,
		patientName: req.body.patientName,
		action: req.body.action
	});

	// Save log in the database
	log
		.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Something wrong while creating the log."
			});
		});
};

exports.findAll = (req, res) => {
	Log.find()
		.then(logs => {
			res.send(logs);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Something wrong while retrieving logs."
			});
		});
};
