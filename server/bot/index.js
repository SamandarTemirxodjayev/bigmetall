const TelegramBot = require('node-telegram-bot-api');
const Sklads = require('../models/Sklad');
const Products = require('../models/Products');
const ExcelJS = require('exceljs');

const token = '6789800772:AAG3uKq4k6gZA2XIEGPzVLgv0amxfJIDspc';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if(msg.text === '/start'){
    bot.sendMessage(chatId, '💎 <b>Big Metall ga Xush Kelibsiz</b>', {
      parse_mode: 'HTML',
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [
            {
              text: '🛍 Ombor',
            }
          ]
        ]
      }
    });
  }
  if (msg.text === '🛍 Ombor'){
    const sklad = await Sklads.find({ active: true });

    let inlineKeyboard = [
        [
            {
                text: '🌐 Sayt Orqali Kirish',
                url: 'http://188.92.28.212:3000/'
            }
        ]
    ];

    sklad.forEach(s => {
        inlineKeyboard.push([
            {
                text: s.name,
                callback_data: 'sklad_' + s._id,
            }
        ]);
    });

    bot.sendMessage(chatId, '🛍 <b>Omborni Tanglang 👇</b>', {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: inlineKeyboard
        }
    });
  }
});
bot.on('callback_query', async (callbackQuery) => {
  const callbackData = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;

  if (callbackData.startsWith('sklad_')) {
      bot.deleteMessage(chatId, callbackQuery.message.message_id);
      const skladId = callbackData.replace('sklad_', '');
      const sklad = await Sklads.findById(skladId);
      const caption = `${sklad.name} omboridagi barcha mahsulotlar ro'yhati`;
      const products = await Products.find({ sklad: skladId, saled: false })
        .populate('sklad')
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
        font: { bold: true },
        alignment: { horizontal: 'center', vertical: 'middle' },
        border: {
          top: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
        },
      };
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sotuvlar');

      worksheet.getCell(1, 1).value = '#';
      worksheet.getCell(1, 2).value = 'Mahsulot Nomi';
      worksheet.getCell(1, 3).value = 'O\'lchamlari';
      worksheet.getCell(1, 4).value = 'Kategoriyasi';
      worksheet.getCell(1, 5).value = 'Qalinligi';
      worksheet.getCell(1, 6).value = 'Holati';
      worksheet.getCell(1, 7).value = 'Uzunligi';
      worksheet.getCell(1, 8).value = 'Soni';
      worksheet.getCell(1, 9).value = 'Umumiy Uzunligi';
      worksheet.getCell(1, 10).value = 'Ombor Nomi';
      worksheet.getCell(1, 11).value = '1 m Uchun Sotuv Narxi';
      worksheet.getCell(1, 12).value = 'Umumiy Narxi';
      products.forEach((item, index) => {
        worksheet.getCell(index + 2, 1).value = index + 1;
        worksheet.getCell(index + 2, 2).value = item.name;
        worksheet.getCell(index + 2, 3).value = item.olchamlari || '';
        worksheet.getCell(index + 2, 4).value = item.category;
        worksheet.getCell(index + 2, 5).value = item.qalinligi_ortasi ? `O'rtasi: ${item.qalinligi_ortasi}mm Chet:${item.qalinligi}mm` : `${item.qalinligi}mm`;
        worksheet.getCell(index + 2, 6).value = item.holati;
        worksheet.getCell(index + 2, 7).value = 
        item.name == 'Palasa' ||
        item.name == 'Kvadrat prut' ||
        item.name == 'Kvadrad profil' ? `Uzunligi: ${ item.uzunligi }m Bo\'yi: ${item.uzunligi_x}sm Eni: ${item.uzunligi_y}sm` 
        : item.uzunligi ? `${item.uzunligi}m` : `Bo'yi: ${item.uzunligi_x}sm Eni: ${item.uzunligi_y}sm`;
        worksheet.getCell(index + 2, 8).value = `${item.quantity ? item.quantity : 0}ta`;
        worksheet.getCell(index + 2, 10).value = item.sklad.name;
        worksheet.getCell(index + 2, 11).value = item.saledPrice ? `${item.saledPrice.toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}so'm` : 'Narx Belgilanmagan';
        worksheet.getCell(index + 2, 12).value = item.uzunligi ? item.saledPrice == null ? "Narx belgilanmagan"
        : `${(item.saledPrice * item.uzunligi * item.quantity)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm` : item.saledPrice == null ? "Narx belgilanmagan" : `${(
              ((item.saledPrice *
                (item.uzunligi_x * item.uzunligi_y)) /
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
            let areaValue = ((item.uzunligi_y * item.uzunligi_x * item.quantity) / 10000).toFixed(2);
            worksheet.getCell(index + 2, 9).value = {
                richText: [
                    { text: `${areaValue}m` },
                    { text: "2", font: { vertAlign: 'superscript' } }
                ]
            };
        }
      });

      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
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
      bot.sendDocument(chatId, filePath, {caption}).catch(error => {
          bot.sendMessage(chatId, "Sorry, there was an error sending the file.");
      });
  }
});
