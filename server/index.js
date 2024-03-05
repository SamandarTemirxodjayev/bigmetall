const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
require("./backuper.js");
// require("./bot/index.js");

const router = require("./routes/router");
const user2Router = require("./routes/user2.router");

const app = express();

const corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);
app.use("/api/user2", user2Router);

const logFolder = path.join(__dirname, "log");
const logFileName = () => {
	const now = new Date();
	const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
		now.getMonth() + 1,
	).padStart(2, "0")}-${now.getFullYear()}`;
	return path.join(logFolder, `${formattedDate}.mongodb.log`);
};
fs.mkdirSync(logFolder, {recursive: true});
let logStream = fs.createWriteStream(logFileName(), {flags: "a"});
mongoose.set("debug", (collectionName, method, query, doc) => {
	const logMessage = `[${new Date().toISOString()}] ${collectionName}.${method} ${JSON.stringify(
		query,
	)} ${JSON.stringify(doc)}\n`;

	if (logStream.path !== logFileName()) {
		logStream.end();
		logStream = fs.createWriteStream(logFileName(), {flags: "a"});
	}

	logStream.write(logMessage);
});

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Server is connecting on MongoDB");
		const PORT = process.env.PORT || 3002;
		app.listen(PORT, () => {
			console.log(
				`Server is running on ${process.env.PROTOCOL}://${process.env.SERVER_IP}:${PORT}`,
			);
		});
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});

module.exports = app;
