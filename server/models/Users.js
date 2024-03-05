const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	login: {
		type: String,
	},
	password: {
		type: String,
	},
	user_level: {
		type: Number,
	},
	name: {
		type: String,
	},
	surname: {
		type: String,
	},
});

userSchema.set("timestamps", true);

const Users = mongoose.model("users", userSchema);

module.exports = Users;
