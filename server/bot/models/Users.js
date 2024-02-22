const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	id: {
		type: String,
	},
	MahsulotTuri: {
		type: String,
	},
	olchamlari: {
		type: String,
	},
	kategoriyasi: {
		type: String,
	},
	qalinligi: {
		type: Number,
	},
	holati: {
		type: String,
	},
	step: {
		type: String,
	},
});

userSchema.set("timestamps", true);

const Users = mongoose.model("botusers", userSchema);

module.exports = Users;
