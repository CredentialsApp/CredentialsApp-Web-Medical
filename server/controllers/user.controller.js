const User = require("../models/user.model");

exports.create = (req, res) => {
	// Create a user
	const user = new User({
		doctorName: req.body.doctorName,
		clinicName: req.body.clinicName,
		password: req.body.password,
		hashWithoutPassword: req.body.hashWithoutPassword,
		passwordHash: req.body.passwordHash,
		publicKey: req.body.publicKey,
		privateKey: req.body.privateKey,
		privateKeyHash: req.body.privateKeyHash
	});

	// Save user in the database
	user
		.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Something wrong while creating the user."
			});
		});
};
