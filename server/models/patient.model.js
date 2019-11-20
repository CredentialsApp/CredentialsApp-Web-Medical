const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
	{
		name: String,
		location: String,
		photo: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Patient", PatientSchema);
