const mongoose = require("mongoose");

const alertsSchema = new mongoose.Schema({
	senderName: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	text: {
		type: String,
	},
	viewUsers: {
		type: Array,
	},
});

alertsSchema.set("timestamps", true);
const Alerts = mongoose.model("alerts", alertsSchema);

module.exports = Alerts;
