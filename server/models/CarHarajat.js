const mongoose = require("mongoose");

const carharajatSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	amount: {
		type: Number,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	carId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "cars",
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

carharajatSchema.set("timestamps", true);

const CarHarajats = mongoose.model("carharajat", carharajatSchema);

module.exports = CarHarajats;
