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
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "products",
		},
	],
	skladId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "sklad",
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
		type: mongoose.Schema.Types.ObjectId,
		ref: "debts",
	},
});

saledsSchema.set("timestamps", true);

const Saleds = mongoose.model("saled", saledsSchema);

module.exports = Saleds;
