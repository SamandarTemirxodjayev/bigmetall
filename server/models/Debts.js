const mongoose = require("mongoose");

const debtsSchema = new mongoose.Schema({
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
	payedAmount: {
		type: Number,
		default: 0,
	},
	historyAmount: {
		type: Array,
		default: [],
	},
	date: {
		type: Date,
		default: Date.now,
	},
	active: {
		type: Boolean,
		default: true,
	},
});

debtsSchema.set("timestamps", true);

const Debts = mongoose.model("debts", debtsSchema);

module.exports = Debts;
