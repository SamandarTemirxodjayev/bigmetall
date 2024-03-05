const mongoose = require("mongoose");

const carsavdoSchema = new mongoose.Schema({
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

carsavdoSchema.set("timestamps", true);

const CarSavdo = mongoose.model("carsavdo", carsavdoSchema);

module.exports = CarSavdo;
