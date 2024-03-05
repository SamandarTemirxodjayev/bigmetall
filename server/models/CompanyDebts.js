const mongoose = require("mongoose");

const debtsSchema = new mongoose.Schema({
	seller: {
		type: String,
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
		type: String,
	},
	active: {
		type: Boolean,
		default: true,
	},
});

debtsSchema.set("timestamps", true);

const CompanyDebt = mongoose.model("companydebt", debtsSchema);

module.exports = CompanyDebt;
