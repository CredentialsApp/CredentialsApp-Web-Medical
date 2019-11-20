const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
	{
		patient: {
			_id: Number,
			name: String,
			location: String,
			photo: String
		},
		note: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Note", NoteSchema);
