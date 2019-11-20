const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
	{
		name: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Patient", PatientSchema);
