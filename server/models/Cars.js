const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	number: {
		type: String,
	},
	active: {
		type: Boolean,
		default: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

carsSchema.set("timestamps", true);

const Cars = mongoose.model("cars", carsSchema);

module.exports = Cars;
