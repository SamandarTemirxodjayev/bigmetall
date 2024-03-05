const mongoose = require("mongoose");

const saledsSchema = new mongoose.Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "client",
	},
	sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "seller",
	},
	products: {
		type: Array,
	},
	allAmount: {
		type: Number,
	},
	type: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	debt: {
		type: Array,
		default: [],
	},
});

saledsSchema.set("timestamps", true);

const Saleds = mongoose.model("saled", saledsSchema);

module.exports = Saleds;
