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
	payedAmount: {
		type: Number,
		default: 0,
	},
	historyAmount: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				default: new mongoose.Types.ObjectId(),
			},
			clientSaved: {
				type: String,
				required: true,
			},
			payedType: {
				type: String,
				required: true,
			},
			amount: {
				type: Number,
				required: true,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
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
