const mongoose = require("mongoose");

const LogSchema = mongoose.Schema(
	{
		doctorName: String,
		patientName: String,
		action: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Log", LogSchema);
