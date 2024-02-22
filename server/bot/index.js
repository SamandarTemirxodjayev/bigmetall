const TelegramBot = require("node-telegram-bot-api");
const Sklads = require("../models/Sklad");
const Products = require("../models/Products");
const ExcelJS = require("exceljs");
const Users = require("./models/Users");

const token = "6789800772:AAG3uKq4k6gZA2XIEGPzVLgv0amxfJIDspc";

const bot = new TelegramBot(token, {polling: true});
console.log("Bot is Run");

bot.on("message", async (msg) => {
	const chatId = msg.chat.id;

	const users = await Users.findOne({id: msg.from.id});
	if (users && users.step === "olchamlari") {
		users.step = "";
		users.olchamlari = msg.text;
		await users.save();
		await bot.sendMessage(chatId, "O'lcham Kiritildi", {
			reply_markup: {
				resize_keyboard: true,
				keyboard: [
					[
						{
							text: "🛍 Ombor",
						},
						{
							text: "🔍 Qidiruv",
						},
					],
					[
						{
							text: "☎️ Aloqa",
						},
					],
				],
			},
		});
		return bot.sendMessage(
			chatId,
			`<b>1️⃣ Mahsulot Turi: ${
				users.MahsulotTuri ? users.MahsulotTuri : "Kirilmagan"
			} \n2️⃣ O'lchamlari: ${
				users.olchamlari ? users.olchamlari : "Kirilmagan"
			}\n3️⃣ Kategoriyasi:${
				users.kategoriyasi ? users.kategoriyasi : "Kirilmagan"
			}\n4️⃣ Qalinligi:${
				users.qalinligi ? users.qalinligi : "Kirilmagan"
			}\n5️⃣ Holati: ${users.holati ? users.holati : "Kirilmagan"}</b>`,
			{
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "1️⃣ Mahsulot Turi",
								callback_data: "search_mahsulot",
							},
						],
						[
							{
								text: "2️⃣ O'lchamlari",
								callback_data: "search_olchamlari",
							},
						],
						[
							{
								text: "3️⃣ Kategoriyasi",
								callback_data: "search_kategoriyasi",
							},
						],
						[
							{
								text: "4️⃣ Qalinligi",
								callback_data: "search_qalinligi",
							},
						],
						[
							{
								text: "5️⃣ Holati",
								callback_data: "search_holati",
							},
						],
						[
							{
								text: "🔍 Qidirish",
								callback_data: "StartSearching",
							},
						],
					],
				},
			},
		);
	} else if (users && users.step === "kategoriyasi") {
		users.step = "";
		users.kategoriyasi = msg.text;
		await users.save();
		await bot.sendMessage(chatId, "Kategoriyasi Kiritildi", {
			reply_markup: {
				resize_keyboard: true,
				keyboard: [
					[
						{
							text: "🛍 Ombor",
						},
						{
							text: "🔍 Qidiruv",
						},
					],
					[
						{
							text: "☎️ Aloqa",
						},
					],
				],
			},
		});
		return bot.sendMessage(
			chatId,
			`<b>1️⃣ Mahsulot Turi: ${
				users.MahsulotTuri ? users.MahsulotTuri : "Kirilmagan"
			} \n2️⃣ O'lchamlari: ${
				users.olchamlari ? users.olchamlari : "Kirilmagan"
			}\n3️⃣ Kategoriyasi:${
				users.kategoriyasi ? users.kategoriyasi : "Kirilmagan"
			}\n4️⃣ Qalinligi:${
				users.qalinligi ? users.qalinligi : "Kirilmagan"
			}\n5️⃣ Holati: ${users.holati ? users.holati : "Kirilmagan"}</b>`,
			{
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "1️⃣ Mahsulot Turi",
								callback_data: "search_mahsulot",
							},
						],
						[
							{
								text: "2️⃣ O'lchamlari",
								callback_data: "search_olchamlari",
							},
						],
						[
							{
								text: "3️⃣ Kategoriyasi",
								callback_data: "search_kategoriyasi",
							},
						],
						[
							{
								text: "4️⃣ Qalinligi",
								callback_data: "search_qalinligi",
							},
						],
						[
							{
								text: "5️⃣ Holati",
								callback_data: "search_holati",
							},
						],
						[
							{
								text: "🔍 Qidirish",
								callback_data: "StartSearching",
							},
						],
					],
				},
			},
		);
	} else if (users && users.step === "qalinligi") {
		if (parseFloat(msg.text)) {
			users.step = "";
			users.qalinligi = parseFloat(msg.text);
			await users.save();
			await bot.sendMessage(chatId, "Qalinligi Kiritildi", {
				reply_markup: {
					resize_keyboard: true,
					keyboard: [
						[
							{
								text: "🛍 Ombor",
							},
							{
								text: "🔍 Qidiruv",
							},
						],
						[
							{
								text: "☎️ Aloqa",
							},
						],
					],
				},
			});
			return bot.sendMessage(
				chatId,
				`<b>1️⃣ Mahsulot Turi: ${
					users.MahsulotTuri ? users.MahsulotTuri : "Kirilmagan"
				} \n2️⃣ O'lchamlari: ${
					users.olchamlari ? users.olchamlari : "Kirilmagan"
				}\n3️⃣ Kategoriyasi:${
					users.kategoriyasi ? users.kategoriyasi : "Kirilmagan"
				}\n4️⃣ Qalinligi:${
					users.qalinligi ? users.qalinligi : "Kirilmagan"
				}\n5️⃣ Holati: ${users.holati ? users.holati : "Kirilmagan"}</b>`,
				{
					parse_mode: "HTML",
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "1️⃣ Mahsulot Turi",
									callback_data: "search_mahsulot",
								},
							],
							[
								{
									text: "2️⃣ O'lchamlari",
									callback_data: "search_olchamlari",
								},
							],
							[
								{
									text: "3️⃣ Kategoriyasi",
									callback_data: "search_kategoriyasi",
								},
							],
							[
								{
									text: "4️⃣ Qalinligi",
									callback_data: "search_qalinligi",
								},
							],
							[
								{
									text: "5️⃣ Holati",
									callback_data: "search_holati",
								},
							],
							[
								{
									text: "🔍 Qidirish",
									callback_data: "StartSearching",
								},
							],
						],
					},
				},
			);
		} else {
			return bot.sendMessage(chatId, "Son Ko'rinishida kiriting");
		}
	}

	if (msg.text === "/start") {
		bot.sendMessage(chatId, "💎 <b>Big Metall ga Xush Kelibsiz</b>", {
			parse_mode: "HTML",
			reply_markup: {
				resize_keyboard: true,
				keyboard: [
					[
						{
							text: "🛍 Ombor",
						},
						{
							text: "🔍 Qidiruv",
						},
					],
					[
						{
							text: "☎️ Aloqa",
						},
					],
				],
			},
		});
	}
	if (msg.text === "🛍 Ombor") {
		const sklad = await Sklads.find({active: true});

		let inlineKeyboard = [
			[
				{
					text: "🌐 Sayt Orqali Kirish",
					url: "http://188.92.28.212:3000/",
				},
			],
		];

		sklad.forEach((s) => {
			inlineKeyboard.push([
				{
					text: s.name,
					callback_data: "sklad_" + s._id,
				},
			]);
		});

		bot.sendMessage(chatId, "🛍 <b>Omborni Tanglang 👇</b>", {
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: inlineKeyboard,
			},
		});
	}
	if (msg.text === "☎️ Aloqa") {
		bot.sendMessage(
			chatId,
			"☎️ <b>Biz bilan Bog'lanish 👇\n\n+998 99 152 33 33\n+998 99 154 33 33\n\n🚀 Big Metall Ishonchli Hamkor</b>",
			{
				parse_mode: "HTML",
			},
		);
	}
	if (msg.text === "🔍 Qidiruv") {
		const users = await Users.findOne({id: chatId});
		if (users) {
			bot.sendMessage(
				chatId,
				`<b>1️⃣ Mahsulot Turi: ${
					users.MahsulotTuri ? users.MahsulotTuri : "Kirilmagan"
				} \n2️⃣ O'lchamlari: ${
					users.olchamlari ? users.olchamlari : "Kirilmagan"
				}\n3️⃣ Kategoriyasi:${
					users.kategoriyasi ? users.kategoriyasi : "Kirilmagan"
				}\n4️⃣ Qalinligi:${
					users.qalinligi ? users.qalinligi : "Kirilmagan"
				}\n5️⃣ Holati: ${users.holati ? users.holati : "Kirilmagan"}</b>`,
				{
					parse_mode: "HTML",
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "1️⃣ Mahsulot Turi",
									callback_data: "search_mahsulot",
								},
							],
							[
								{
									text: "2️⃣ O'lchamlari",
									callback_data: "search_olchamlari",
								},
							],
							[
								{
									text: "3️⃣ Kategoriyasi",
									callback_data: "search_kategoriyasi",
								},
							],
							[
								{
									text: "4️⃣ Qalinligi",
									callback_data: "search_qalinligi",
								},
							],
							[
								{
									text: "5️⃣ Holati",
									callback_data: "search_holati",
								},
							],
							[
								{
									text: "🔍 Qidirish",
									callback_data: "StartSearching",
								},
							],
						],
					},
				},
			);
		} else {
			bot.sendMessage(
				chatId,
				"<b>1️⃣ Mahsulot Turi: Kirilmagan \n2️⃣ O'lchamlari: Kirilmagan \n3️⃣ Kategoriyasi: Kirilmagan \n4️⃣ Qalinligi: Kirilmagan \n5️⃣ Holati: Kirilmagan</b>",
				{
					parse_mode: "HTML",
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "1️⃣ Mahsulot Turi",
									callback_data: "search_mahsulot",
								},
							],
							[
								{
									text: "2️⃣ O'lchamlari",
									callback_data: "search_olchamlari",
								},
							],
							[
								{
									text: "3️⃣ Kategoriyasi",
									callback_data: "search_kategoriyasi",
								},
							],
							[
								{
									text: "4️⃣ Qalinligi",
									callback_data: "search_qalinligi",
								},
							],
							[
								{
									text: "5️⃣ Holati",
									callback_data: "search_holati",
								},
							],
						],
					},
				},
			);
		}
	}
});
bot.on("callback_query", async (callbackQuery) => {
	const callbackData = callbackQuery.data;
	const chatId = callbackQuery.message.chat.id;

	if (callbackData === "StartSearching") {
		bot.deleteMessage(chatId, callbackQuery.message.message_id);
		const users = await Users.findOne({id: chatId});
		const caption = "Qidiruv Natijalari";
		if (users) {
			let query = {saled: false};

			if (users.MahsulotTuri) {
				query.name = users.MahsulotTuri;
			}
			if (users.olchamlari) {
				query.olchamlari = users.olchamlari;
			}
			if (users.kategoriyasi) {
				query.category = users.kategoriyasi;
			}
			if (users.qalinligi) {
				query.qalinligi = users.qalinligi;
			}
			if (users.holati) {
				query.holati = users.holati;
			}
			await Users.deleteOne({id: chatId});
			const products = await Products.find(query).populate("sklad").sort({
				name: -1,
				category: 1,
				olchamlari: 1,
				qalinligi: 1,
				qalinligi_ortasi: 1,
				uzunligi: 1,
				uzunligi_x: 1,
				uzunligi_y: 1,
				quantity: 1,
			});
			const cellStyle = {
				font: {bold: true},
				alignment: {horizontal: "center", vertical: "middle"},
				border: {
					top: {style: "thin"},
					right: {style: "thin"},
					bottom: {style: "thin"},
					left: {style: "thin"},
				},
			};
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet("Sotuvlar");

			worksheet.getCell(1, 1).value = "#";
			worksheet.getCell(1, 2).value = "Mahsulot Nomi";
			worksheet.getCell(1, 3).value = "O'lchamlari";
			worksheet.getCell(1, 4).value = "Kategoriyasi";
			worksheet.getCell(1, 5).value = "Qalinligi";
			worksheet.getCell(1, 6).value = "Holati";
			worksheet.getCell(1, 7).value = "Uzunligi";
			worksheet.getCell(1, 8).value = "Soni";
			worksheet.getCell(1, 9).value = "Umumiy Uzunligi";
			worksheet.getCell(1, 10).value = "Ombor Nomi";
			worksheet.getCell(1, 11).value = "1 m Uchun Sotuv Narxi";
			worksheet.getCell(1, 12).value = "Umumiy Narxi";
			products.forEach((item, index) => {
				worksheet.getCell(index + 2, 1).value = index + 1;
				worksheet.getCell(index + 2, 2).value = item.name;
				worksheet.getCell(index + 2, 3).value = item.olchamlari || "";
				worksheet.getCell(index + 2, 4).value = item.category;
				worksheet.getCell(index + 2, 5).value = item.qalinligi_ortasi
					? `O'rtasi: ${item.qalinligi_ortasi}mm Chet:${item.qalinligi}mm`
					: `${item.qalinligi}mm`;
				worksheet.getCell(index + 2, 6).value = item.holati;
				worksheet.getCell(index + 2, 7).value =
					item.name == "Palasa" ||
					item.name == "Kvadrat prut" ||
					item.name == "Kvadrad profil"
						? `Uzunligi: ${item.uzunligi}m Bo\'yi: ${item.uzunligi_x}sm Eni: ${item.uzunligi_y}sm`
						: item.uzunligi
						? `${item.uzunligi}m`
						: `Bo'yi: ${item.uzunligi_x}sm Eni: ${item.uzunligi_y}sm`;
				worksheet.getCell(index + 2, 8).value = `${
					item.quantity ? item.quantity : 0
				}ta`;
				worksheet.getCell(index + 2, 10).value = item.sklad.name;
				worksheet.getCell(index + 2, 11).value = item.saledPrice
					? `${item.saledPrice
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}so'm`
					: "Narx Belgilanmagan";
				worksheet.getCell(index + 2, 12).value = item.uzunligi
					? item.saledPrice == null
						? "Narx belgilanmagan"
						: `${(item.saledPrice * item.uzunligi * item.quantity)
								.toFixed(2)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
					: item.saledPrice == null
					? "Narx belgilanmagan"
					: `${(
							((item.saledPrice * (item.uzunligi_x * item.uzunligi_y)) /
								10000) *
							item.quantity
					  )
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`;
				let uzunligiCellValue;
				if (item.uzunligi) {
					uzunligiCellValue = `${(item.uzunligi * item.quantity).toFixed(2)}m`;
					worksheet.getCell(index + 2, 9).value = uzunligiCellValue;
				} else {
					let areaValue = (
						(item.uzunligi_y * item.uzunligi_x * item.quantity) /
						10000
					).toFixed(2);
					worksheet.getCell(index + 2, 9).value = {
						richText: [
							{text: `${areaValue}m`},
							{text: "2", font: {vertAlign: "superscript"}},
						],
					};
				}
			});

			worksheet.columns.forEach((column) => {
				let maxLength = 0;
				column.eachCell({includeEmpty: true}, (cell) => {
					const columnLength = cell.value ? cell.value.toString().length : 10;
					if (columnLength > maxLength) {
						maxLength = columnLength + 3;
					}
				});
				column.width = maxLength < 10 ? 10 : maxLength;
			});
			worksheet.eachRow((row) => {
				row.eachCell((cell) => {
					cell.style = cellStyle;
				});
			});

			await workbook.xlsx.writeFile(`./docs/${chatId}-qidiruv.xlsx`);
			const filePath = `./docs/${chatId}-qidiruv.xlsx`;
			bot.sendDocument(chatId, filePath, {caption}).catch((error) => {
				bot.sendMessage(chatId, "Sorry, there was an error sending the file.");
			});
		} else {
			bot.sendMessage(chatId, "Xatolik botga /start buyrug'ini yuboring");
		}
	}

	if (callbackData.startsWith("sklad_")) {
		bot.deleteMessage(chatId, callbackQuery.message.message_id);
		const skladId = callbackData.replace("sklad_", "");
		const sklad = await Sklads.findById(skladId);
		const caption = `${sklad.name} omboridagi barcha mahsulotlar ro'yhati`;
		const products = await Products.find({sklad: skladId, saled: false})
			.populate("sklad")
			.sort({
				name: -1,
				category: 1,
				olchamlari: 1,
				qalinligi: 1,
				qalinligi_ortasi: 1,
				uzunligi: 1,
				uzunligi_x: 1,
				uzunligi_y: 1,
				quantity: 1,
			});

		const cellStyle = {
			font: {bold: true},
			alignment: {horizontal: "center", vertical: "middle"},
			border: {
				top: {style: "thin"},
				right: {style: "thin"},
				bottom: {style: "thin"},
				left: {style: "thin"},
			},
		};
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Sotuvlar");

		worksheet.getCell(1, 1).value = "#";
		worksheet.getCell(1, 2).value = "Mahsulot Nomi";
		worksheet.getCell(1, 3).value = "O'lchamlari";
		worksheet.getCell(1, 4).value = "Kategoriyasi";
		worksheet.getCell(1, 5).value = "Qalinligi";
		worksheet.getCell(1, 6).value = "Holati";
		worksheet.getCell(1, 7).value = "Uzunligi";
		worksheet.getCell(1, 8).value = "Soni";
		worksheet.getCell(1, 9).value = "Umumiy Uzunligi";
		worksheet.getCell(1, 10).value = "Ombor Nomi";
		worksheet.getCell(1, 11).value = "1 m Uchun Sotuv Narxi";
		worksheet.getCell(1, 12).value = "Umumiy Narxi";
		products.forEach((item, index) => {
			worksheet.getCell(index + 2, 1).value = index + 1;
			worksheet.getCell(index + 2, 2).value = item.name;
			worksheet.getCell(index + 2, 3).value = item.olchamlari || "";
			worksheet.getCell(index + 2, 4).value = item.category;
			worksheet.getCell(index + 2, 5).value = item.qalinligi_ortasi
				? `O'rtasi: ${item.qalinligi_ortasi}mm Chet:${item.qalinligi}mm`
				: `${item.qalinligi}mm`;
			worksheet.getCell(index + 2, 6).value = item.holati;
			worksheet.getCell(index + 2, 7).value =
				item.name == "Palasa" ||
				item.name == "Kvadrat prut" ||
				item.name == "Kvadrad profil"
					? `Uzunligi: ${item.uzunligi}m Bo\'yi: ${item.uzunligi_x}sm Eni: ${item.uzunligi_y}sm`
					: item.uzunligi
					? `${item.uzunligi}m`
					: `Bo'yi: ${item.uzunligi_x}sm Eni: ${item.uzunligi_y}sm`;
			worksheet.getCell(index + 2, 8).value = `${
				item.quantity ? item.quantity : 0
			}ta`;
			worksheet.getCell(index + 2, 10).value = item.sklad.name;
			worksheet.getCell(index + 2, 11).value = item.saledPrice
				? `${item.saledPrice
						.toFixed(2)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}so'm`
				: "Narx Belgilanmagan";
			worksheet.getCell(index + 2, 12).value = item.uzunligi
				? item.saledPrice == null
					? "Narx belgilanmagan"
					: `${(item.saledPrice * item.uzunligi * item.quantity)
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
				: item.saledPrice == null
				? "Narx belgilanmagan"
				: `${(
						((item.saledPrice * (item.uzunligi_x * item.uzunligi_y)) / 10000) *
						item.quantity
				  )
						.toFixed(2)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`;
			let uzunligiCellValue;
			if (item.uzunligi) {
				uzunligiCellValue = `${(item.uzunligi * item.quantity).toFixed(2)}m`;
				worksheet.getCell(index + 2, 9).value = uzunligiCellValue;
			} else {
				let areaValue = (
					(item.uzunligi_y * item.uzunligi_x * item.quantity) /
					10000
				).toFixed(2);
				worksheet.getCell(index + 2, 9).value = {
					richText: [
						{text: `${areaValue}m`},
						{text: "2", font: {vertAlign: "superscript"}},
					],
				};
			}
		});

		worksheet.columns.forEach((column) => {
			let maxLength = 0;
			column.eachCell({includeEmpty: true}, (cell) => {
				const columnLength = cell.value ? cell.value.toString().length : 10;
				if (columnLength > maxLength) {
					maxLength = columnLength + 3;
				}
			});
			column.width = maxLength < 10 ? 10 : maxLength;
		});
		worksheet.eachRow((row) => {
			row.eachCell((cell) => {
				cell.style = cellStyle;
			});
		});

		await workbook.xlsx.writeFile(`./docs/${sklad.name}.xlsx`);
		const filePath = `./docs/${sklad.name}.xlsx`;
		bot.sendDocument(chatId, filePath, {caption}).catch((error) => {
			bot.sendMessage(chatId, "Sorry, there was an error sending the file.");
		});
	}
	if (callbackData.startsWith("search_")) {
		bot.deleteMessage(chatId, callbackQuery.message.message_id);
		const type = callbackData.replace("search_", "");
		if (type == "holati") {
			bot.sendMessage(chatId, "<b>Temir Mahsulot Holatini Tanglang 👇</b>", {
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "Yangi",
								callback_data: "setholati_Yangi",
							},
						],
						[
							{
								text: "Eski",
								callback_data: "setholati_Eski",
							},
						],
						[
							{
								text: "B/U",
								callback_data: "setholati_B/U",
							},
						],
					],
				},
			});
		} else if (type == "mahsulot") {
			bot.sendMessage(chatId, "<b>Temir Mahsulotni Tanglang 👇</b>", {
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "Dvuxtavr",
								callback_data: "setmahsulot_Dvuxtavr",
							},
						],
						[
							{
								text: "Shvellir",
								callback_data: "setmahsulot_Shvellir",
							},
						],
						[
							{
								text: "Ugalok",
								callback_data: "setmahsulot_Ugalok",
							},
						],
						[
							{
								text: "Truba",
								callback_data: "setmahsulot_Truba",
							},
						],
						[
							{
								text: "List",
								callback_data: "setmahsulot_List",
							},
						],
						[
							{
								text: "Armatura",
								callback_data: "setmahsulot_Armatura",
							},
						],
						[
							{
								text: "Kvadrad profil",
								callback_data: "setmahsulot_Kvadrad profil",
							},
						],
						[
							{
								text: "Kvadrat prut",
								callback_data: "setmahsulot_Kvadrat prut",
							},
						],
						[
							{
								text: "Prut",
								callback_data: "setmahsulot_Prut",
							},
						],
						[
							{
								text: "Palasa",
								callback_data: "setmahsulot_Palasa",
							},
						],
						[
							{
								text: "Planka",
								callback_data: "setmahsulot_Planka",
							},
						],
					],
				},
			});
		} else if (type == "olchamlari") {
			const users = await Users.findOne({id: callbackQuery.from.id});
			if (users) {
				users.step = "olchamlari";
				await users.save();
			} else {
				const newUser = new Users({
					id: callbackQuery.from.id,
					step: "olchamlari",
				});
				await newUser.save();
			}
			bot.sendMessage(chatId, "O'lchamni Kiriting", {
				parse_mode: "HTML",
				reply_markup: {
					remove_keyboard: true,
				},
			});
		} else if (type == "kategoriyasi") {
			const users = await Users.findOne({id: callbackQuery.from.id});
			if (users) {
				users.step = "kategoriyasi";
				await users.save();
			} else {
				const newUser = new Users({
					id: callbackQuery.from.id,
					step: "kategoriyasi",
				});
				await newUser.save();
			}
			bot.sendMessage(chatId, "Kategoriyasini Kiriting", {
				parse_mode: "HTML",
				reply_markup: {
					remove_keyboard: true,
				},
			});
		} else if (type == "qalinligi") {
			const users = await Users.findOne({id: callbackQuery.from.id});
			if (users) {
				users.step = "qalinligi";
				await users.save();
			} else {
				const newUser = new Users({
					id: callbackQuery.from.id,
					step: "qalinligi",
				});
				await newUser.save();
			}
			bot.sendMessage(chatId, "Qalinligini Kiriting", {
				parse_mode: "HTML",
				reply_markup: {
					remove_keyboard: true,
				},
			});
		}
	}
	if (callbackData.startsWith("setholati_")) {
		bot.deleteMessage(chatId, callbackQuery.message.message_id);
		const type = callbackData.replace("setholati_", "");
		const users = await Users.findOne({id: callbackQuery.from.id});
		if (users) {
			users.holati = type;
			await users.save();
		} else {
			const newUser = new Users({
				id: callbackQuery.from.id,
				holati: type,
			});
			await newUser.save();
		}
		bot.sendMessage(
			chatId,
			`<b>1️⃣ Mahsulot Turi: ${
				users.MahsulotTuri ? users.MahsulotTuri : "Kirilmagan"
			} \n2️⃣ O'lchamlari: ${
				users.olchamlari ? users.olchamlari : "Kirilmagan"
			}\n3️⃣ Kategoriyasi:${
				users.kategoriyasi ? users.kategoriyasi : "Kirilmagan"
			}\n4️⃣ Qalinligi:${
				users.qalinligi ? users.qalinligi : "Kirilmagan"
			}\n5️⃣ Holati: ${users.holati ? users.holati : "Kirilmagan"}</b>`,
			{
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "1️⃣ Mahsulot Turi",
								callback_data: "search_mahsulot",
							},
						],
						[
							{
								text: "2️⃣ O'lchamlari",
								callback_data: "search_olchamlari",
							},
						],
						[
							{
								text: "3️⃣ Kategoriyasi",
								callback_data: "search_kategoriyasi",
							},
						],
						[
							{
								text: "4️⃣ Qalinligi",
								callback_data: "search_qalinligi",
							},
						],
						[
							{
								text: "5️⃣ Holati",
								callback_data: "search_holati",
							},
						],
						[
							{
								text: "🔍 Qidirish",
								callback_data: "StartSearching",
							},
						],
					],
				},
			},
		);
	}
	if (callbackData.startsWith("setmahsulot_")) {
		bot.deleteMessage(chatId, callbackQuery.message.message_id);
		const type = callbackData.replace("setmahsulot_", "");
		const users = await Users.findOne({id: callbackQuery.from.id});
		if (users) {
			users.MahsulotTuri = type;
			await users.save();
		} else {
			const newUser = new Users({
				id: callbackQuery.from.id,
				MahsulotTuri: type,
			});
			await newUser.save();
		}
		bot.sendMessage(
			chatId,
			`<b>1️⃣ Mahsulot Turi: ${
				users && users.MahsulotTuri ? users.MahsulotTuri : "Kirilmagan"
			} \n2️⃣ O'lchamlari: ${
				users && users.olchamlari ? users.olchamlari : "Kirilmagan"
			}\n3️⃣ Kategoriyasi:${
				users && users.kategoriyasi ? users.kategoriyasi : "Kirilmagan"
			}\n4️⃣ Qalinligi:${
				users && users.qalinligi ? users.qalinligi : "Kirilmagan"
			}\n5️⃣ Holati: ${users && users.holati ? users.holati : "Kirilmagan"}</b>`,
			{
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "1️⃣ Mahsulot Turi",
								callback_data: "search_mahsulot",
							},
						],
						[
							{
								text: "2️⃣ O'lchamlari",
								callback_data: "search_olchamlari",
							},
						],
						[
							{
								text: "3️⃣ Kategoriyasi",
								callback_data: "search_kategoriyasi",
							},
						],
						[
							{
								text: "4️⃣ Qalinligi",
								callback_data: "search_qalinligi",
							},
						],
						[
							{
								text: "5️⃣ Holati",
								callback_data: "search_holati",
							},
						],
						[
							{
								text: "🔍 Qidirish",
								callback_data: "StartSearching",
							},
						],
					],
				},
			},
		);
	}
});
