const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
	{
		doctorName: String,
		clinicName: String,
		password: String,
		hashWithoutPassword: String,
		passwordHash: String,
		publicKey: String,
		privateKey: String,
		privateKeyHash: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("User", UserSchema);
