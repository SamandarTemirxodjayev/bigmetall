const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const ExcelJS = require('exceljs');
const Users = require('../models/Users');
const Harajats = require('../models/Harajats');
const dateFunction = require('../functions/date');
const HarajatHistoryDeleted = require('../models/HarajatsHistoryDeleted');
const HarajatHistoryEdited = require('../models/HarajatsHistoryEdited');
const Sklads = require('../models/Sklad');
const Products = require('../models/Products');
const { padWithZero } = require('../functions/padZero');
const Clients = require('../models/Clients');
require('dotenv').config();

exports.index = async (req, res) => {
  res.json({ message: 'Welcome to the API!' });
};
exports.token = (req, res) => {
  try {
    const token = jwt.sign({ data: 123 }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '12h',
    });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Error when find user' });
  }
};
exports.check = async (req, res) => {
  res.json({ message: req.userId });
};
exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    const newUser = new Users({
      login: req.body.login,
      password: hashedPassword,
      name: req.body.name,
      user_level: req.body.user_level,
      surname: req.body.surname,
    });
    await newUser.save();
    return res.status(201).json({ status: 'success', message: 'User registered successfully', data: newUser });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ login: req.body.login });
    if (!user) {
      return res.status(400).json({ message: 'Foydalanuvchi Topilmadi' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Parol Xato' });
    }
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '12h',
    });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.userGetInfo = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    return res.json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatPut = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const harajat = new Harajats({
      name: req.body.name,
      amount: req.body.amount,
      date: dateFunction.getCurrentDateTimeInJSON().date,
      time: dateFunction.getCurrentDateTimeInJSON().time,
    });
    await harajat.save();
    return res.json({ harajat });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatGet = async (req, res) => {
  try {
    const harajat = await Harajats.find().sort({ _id: -1 }).limit(req.query.limit);
    return res.json(harajat);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatPost = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const { date } = req.body;
    const harajat = await Harajats.find({
      date: {
        day: date.day,
        month: date.month,
        year: date.year,
      },
    });
    return res.json(harajat);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatDelete = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const harajat = await Harajats.findById(req.params.id);
    if (!harajat) {
      return res.status(404).json({ message: 'Harajat not found' });
    }
    const history = new HarajatHistoryDeleted({
      user: req.userId,
      deletedFrom: {
        name: harajat.name,
        amount: harajat.amount,
      },
      date: dateFunction.getCurrentDateTimeInJSON().date,
      time: dateFunction.getCurrentDateTimeInJSON().time,
    });
    await history.save();
    await harajat.deleteOne();
    return res.json({ message: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatPatch = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const harajat = await Harajats.findById(req.params.id);
    if (!harajat) {
      return res.status(404).json({ message: 'Harajat not found' });
    }
    const history = new HarajatHistoryEdited({
      user: req.userId,
      editedFrom: {
        name: harajat.name,
        amount: harajat.amount,
      },
      editedID: req.params.id,
      date: dateFunction.getCurrentDateTimeInJSON().date,
      time: dateFunction.getCurrentDateTimeInJSON().time,
    });
    await history.save();
    harajat.name = req.body.name;
    harajat.amount = req.body.amount;
    await harajat.save();
    return res.json({ harajat });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.aggregateHarajatwithYear = async (req, res) => {
  const { year } = req.body;
  try {
    const result = await Harajats.aggregate([
      {
        $match: {
          'date.year': year,
        },
      },
      {
        $group: {
          _id: {
            year: '$date.year',
            month: '$date.month',
          },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          totalAmount: 1,
        },
      },
    ]);

    const monthlySummary = {};
    for (let i = 1; i <= 12; i += 1) {
      const month = i;
      const matchingMonth = result.find((item) => item.month === month);
      const totalAmount = matchingMonth ? matchingMonth.totalAmount : 0;
      monthlySummary[month] = totalAmount;
    }

    return res.json({ monthlySummary, year });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatFinder = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }

    const regexPattern = new RegExp(req.body.search, 'i');

    const startDate = req.body.startDate || { day: 1, month: 1, year: 2021 };
    const endDate = req.body.endDate || { day: 31, month: 12, year: 2032 };

    const results = await Harajats.find({
      name: regexPattern,
      $or: [
        {
          $and: [
            { 'date.year': { $gte: startDate.year, $lte: endDate.year } },
            { 'date.month': { $gte: startDate.month, $lte: endDate.month } },
            { 'date.day': { $gte: startDate.day, $lte: endDate.day } },
          ],
        },
        { date: null },
      ],
    })
      .sort({ _id: -1 })
      .limit(req.query.limit);

    return res.json(results);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while searching for Harajat.' });
  }
};
exports.harajatExcel = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
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
    let worksheet = workbook.addWorksheet('Yillik');
    let harajats = await Harajats.aggregate([
      {
        $match: {
          'date.year': new Date().getFullYear(),
        },
      },
    ]);
    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Harajat Nomi';
    worksheet.getCell(1, 3).value = 'Summasi';
    worksheet.getCell(1, 4).value = 'Sanasi';
    worksheet.getCell(1, 5).value = 'Vaqti';
    let totalAmount = 0;
    harajats.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name || '';
      worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
      worksheet.getCell(index + 2, 4).value = `${padWithZero(item.date.day)}.${padWithZero(item.date.month)}.${padWithZero(item.date.year)}`;
      worksheet.getCell(index + 2, 5).value = `${padWithZero(item.time.hour)}:${padWithZero(item.time.minute)}:${padWithZero(item.time.second)}`;
      totalAmount += item.amount;
    });
    worksheet.getCell(harajats.length + 2, 2).value = 'Umumiy Harajat Summasi';
    worksheet.getCell(harajats.length + 2, 3).value = `${totalAmount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.style = cellStyle;
      });
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

    worksheet = workbook.addWorksheet('Oylik');
    harajats = await Harajats.aggregate([
      {
        $match: {
          'date.month': new Date().getMonth() + 1,
        },
      },
    ]);
    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Harajat Nomi';
    worksheet.getCell(1, 3).value = 'Summasi';
    worksheet.getCell(1, 4).value = 'Sanasi';
    worksheet.getCell(1, 5).value = 'Vaqti';
    totalAmount = 0;
    harajats.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name || '';
      worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
      worksheet.getCell(index + 2, 4).value = `${padWithZero(item.date.day)}.${padWithZero(item.date.month)}.${padWithZero(item.date.year)}`;
      worksheet.getCell(index + 2, 5).value = `${padWithZero(item.time.hour)}:${padWithZero(item.time.minute)}:${padWithZero(item.time.second)}`;
      totalAmount += item.amount;
    });
    worksheet.getCell(harajats.length + 2, 2).value = 'Umumiy Harajat Summasi';
    worksheet.getCell(harajats.length + 2, 3).value = `${totalAmount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.style = cellStyle;
      });
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

    worksheet = workbook.addWorksheet('Haftalik');
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const startDate = {
      day: date.getDate(),
      month: (date.getMonth() + 1),
      year: date.getFullYear(),
    };
    date.setDate(date.getDate() + 7);
    const endDate = {
      day: date.getDate(),
      month: (date.getMonth() + 1),
      year: date.getFullYear(),
    };
    harajats = await Harajats.aggregate([
      {
        $match: {
          $and: [
            { 'date.year': { $gte: startDate.year, $lte: endDate.year } },
            { 'date.month': { $gte: startDate.month, $lte: endDate.month } },
            { 'date.day': { $gte: startDate.day, $lte: endDate.day } },
          ],
        },
      },
    ]);
    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Harajat Nomi';
    worksheet.getCell(1, 3).value = 'Summasi';
    worksheet.getCell(1, 4).value = 'Sanasi';
    worksheet.getCell(1, 5).value = 'Vaqti';
    totalAmount = 0;
    harajats.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name || '';
      worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
      worksheet.getCell(index + 2, 4).value = `${padWithZero(item.date.day)}.${padWithZero(item.date.month)}.${padWithZero(item.date.year)}`;
      worksheet.getCell(index + 2, 5).value = `${padWithZero(item.time.hour)}:${padWithZero(item.time.minute)}:${padWithZero(item.time.second)}`;
      totalAmount += item.amount;
    });
    worksheet.getCell(harajats.length + 2, 2).value = 'Umumiy Harajat Summasi';
    worksheet.getCell(harajats.length + 2, 3).value = `${totalAmount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.style = cellStyle;
      });
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

    await workbook.xlsx.writeFile('./docs/SKLAD.xlsx');
    return res.download('./docs/SKLAD.xlsx');
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladGet = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const sklad = await Sklads.find();
    return res.json(sklad);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladPut = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const newSklad = new Sklads({
      name: req.body.name,
      date: dateFunction.getCurrentDateTimeInJSON().date,
      time: dateFunction.getCurrentDateTimeInJSON().time,
    });
    await newSklad.save();
    return res.json(newSklad);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladDelete = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const sklad = await Sklads.findById(req.params.id);
    if (!sklad) {
      return res.status(404).json({ message: 'Sklad not found' });
    }
    await sklad.deleteOne();
    return res.json({ message: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladPatch = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const sklad = await Sklads.findById(req.params.id);
    if (!sklad) {
      return res.status(404).json({ message: 'Sklad not found' });
    }
    sklad.name = req.body.name;
    await sklad.save();
    return res.json({ sklad });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladFinder = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const regexPattern = new RegExp(req.body.search, 'i');
    const results = await Sklads.find({
      name: regexPattern,
    })
      .sort({ _id: -1 });
    return res.json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsGet = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }

    const aggregatedProducts = await Products.aggregate([
      {
        $match: { sklad: new mongoose.Types.ObjectId(req.params.id), saled: false },
      },
      {
        $group: {
          _id: {
            name: '$name',
            qalinligi: '$qalinligi',
            qalinligi_ortasi: '$qalinligi_ortasi',
            category: '$category',
            holati: '$holati',
            uzunligi: '$uzunligi',
            uzunligi_x: '$uzunligi_x',
            olchamlari: '$olchamlari',
            uzunligi_y: '$uzunligi_y',
            sklad: '$sklad',
            price: '$price',
            saledPrice: '$saledPrice',
          },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id.name',
          qalinligi: '$_id.qalinligi',
          qalinligi_ortasi: '$_id.qalinligi_ortasi',
          category: '$_id.category',
          holati: '$_id.holati',
          uzunligi: '$_id.uzunligi',
          uzunligi_x: '$_id.uzunligi_x',
          uzunligi_y: '$_id.uzunligi_y',
          sklad: '$_id.sklad',
          price: '$_id.price',
          olchamlari: '$_id.olchamlari',
          saledPrice: '$_id.saledPrice',
          quantity: '$totalQuantity',
        },
      },
    ]);

    return res.json(aggregatedProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsPatch = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const product = await Products.findById(req.params.id).populate('saledClient');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsGetAll = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const products = await Products.aggregate([
      {
        $match: { saled: false },
      },
      {
        $group: {
          _id: {
            name: '$name',
            qalinligi: '$qalinligi',
            qalinligi_ortasi: '$qalinligi_ortasi',
            category: '$category',
            holati: '$holati',
            uzunligi: '$uzunligi',
            uzunligi_x: '$uzunligi_x',
            olchamlari: '$olchamlari',
            uzunligi_y: '$uzunligi_y',
            sklad: '$sklad',
            price: '$price',
            saledPrice: '$saledPrice',
          },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          _id: '$_id',
          name: '$_id.name',
          qalinligi: '$_id.qalinligi',
          qalinligi_ortasi: '$_id.qalinligi_ortasi',
          category: '$_id.category',
          holati: '$_id.holati',
          uzunligi: '$_id.uzunligi',
          uzunligi_x: '$_id.uzunligi_x',
          uzunligi_y: '$_id.uzunligi_y',
          sklad: '$_id.sklad',
          price: '$_id.price',
          olchamlari: '$_id.olchamlari',
          saledPrice: '$_id.saledPrice',
          quantity: '$totalQuantity',
        },
      },
    ]);
    return res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsPut = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    for (let i = 0; i < req.body.quantity; i += 1) {
      try {
        const newProduct = new Products({
          name: req.body.name,
          qalinligi: req.body.qalinligi,
          qalinligi_ortasi: req.body.qalinligiOrtasi,
          category: req.body.category,
          olchamlari: req.body.olchamlari,
          holati: req.body.holati,
          uzunligi: req.body.uzunligi,
          uzunligi_x: req.body.uzunligi_x,
          uzunligi_y: req.body.uzunligi_y,
          quantity: 1,
          sklad: req.body.sklad,
          price: req.body.price,
          saledPrice: req.body.saledPrice,
          date: dateFunction.getCurrentDateTimeInJSON().date,
          time: dateFunction.getCurrentDateTimeInJSON().time,
        });
        newProduct.save();
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    return res.json({ saved: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsGetClients = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }

    const productsDate = await Products.aggregate([
      {
        $match: {
          saled: true,
          saledClient: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: 'saledClient',
          foreignField: '_id',
          as: 'saledClient',
        },
      },
      {
        $unwind: '$saledClient',
      },
      {
        $sort: {
          'saledDate.year': -1,
          'saledDate.month': -1,
          'saledDate.day': -1,
        },
      },
      {
        $limit: 50,
      },
    ]);

    const uniqueDates = Array.from(new Set(productsDate.map((product) => {
      const { day, month, year } = product.saledDate;
      return `${day}-${month}-${year}`;
    })));

    return res.json({ dates: uniqueDates, products: productsDate });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.productsGetClientsByDate = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const products = await Products.find({
      saled: true,
      saledClient: new mongoose.Types.ObjectId(req.params.id),
      saledDate: {
        day: req.body.date.day,
        month: req.body.date.month,
        year: req.body.date.year,
      },
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsGetSaled = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const products = await Products.find({
      saled: true,
      saledClient: new mongoose.Types.ObjectId(req.params.id),
      saledType: 'Qarz',
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladExcelGet = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
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
    const worksheet = workbook.addWorksheet('SKLAD');
    const aggregatedProducts = await Products.aggregate([
      {
        $match: { sklad: new mongoose.Types.ObjectId(req.params.id), saled: false },
      },
      {
        $group: {
          _id: {
            name: '$name',
            qalinligi: '$qalinligi',
            qalinligi_ortasi: '$qalinligi_ortasi',
            category: '$category',
            holati: '$holati',
            uzunligi: '$uzunligi',
            uzunligi_x: '$uzunligi_x',
            olchamlari: '$olchamlari',
            uzunligi_y: '$uzunligi_y',
            sklad: '$sklad',
            price: '$price',
            saledPrice: '$saledPrice',
          },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id.name',
          qalinligi: '$_id.qalinligi',
          qalinligi_ortasi: '$_id.qalinligi_ortasi',
          category: '$_id.category',
          holati: '$_id.holati',
          uzunligi: '$_id.uzunligi',
          uzunligi_x: '$_id.uzunligi_x',
          uzunligi_y: '$_id.uzunligi_y',
          sklad: '$_id.sklad',
          price: '$_id.price',
          olchamlari: '$_id.olchamlari',
          saledPrice: '$_id.saledPrice',
          quantity: '$totalQuantity',
        },
      },
    ]);
    worksheet.getCell(1, 1).value = 'Mahsulot Nomi';
    worksheet.getCell(1, 2).value = 'O\'lchamlari';
    worksheet.getCell(1, 3).value = 'Kategoriyasi';
    worksheet.getCell(1, 4).value = 'Holati';
    worksheet.getCell(1, 5).value = 'Qalinligi';
    worksheet.getCell(1, 6).value = 'O\'lchamlari';
    worksheet.getCell(1, 7).value = 'Uzunligi';
    worksheet.getCell(1, 8).value = 'Soni';
    worksheet.getCell(1, 9).value = 'Umumiy Uzunligi';
    worksheet.getCell(1, 10).value = '1 m Uchun Narx';
    aggregatedProducts.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = item.name;
      worksheet.getCell(index + 2, 2).value = item.olchamlari || '';
      worksheet.getCell(index + 2, 3).value = item.category;
      worksheet.getCell(index + 2, 4).value = item.holati;
      worksheet.getCell(index + 2, 5).value = item.qalinligi_ortasi ? `O'rtasi: ${item.qalinligi_ortasi}mm Chet:${item.qalinligi}mm` : `${item.qalinligi}mm`;
      worksheet.getCell(index + 2, 6).value = item.uzunligi_y || item.uzunligi_x ? `${item.uzunligi_y}mm ${item.uzunligi_x}mm` : '';
      worksheet.getCell(index + 2, 7).value = `${item.uzunligi ? item.uzunligi : 0}m`;
      worksheet.getCell(index + 2, 8).value = `${item.quantity ? item.quantity : 0}ta`;
      worksheet.getCell(index + 2, 9).value = `${item.quantity * item.uzunligi}m`;
      worksheet.getCell(index + 2, 10).value = item.saledPrice ? `${item.saledPrice}so'm` : 'Narx Belgilanmagan';
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
    await workbook.xlsx.writeFile('./docs/HISOBOT.xlsx');
    return res.download('./docs/HISOBOT.xlsx');
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsGet = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const clients = await Clients.find();
    return res.json(clients);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsGetById = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const client = await Clients.findById(req.params.id);
    return res.json(client);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsPut = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const newClient = new Clients({
      name: req.body.name,
      phone: req.body.phone,
      date: dateFunction.getCurrentDateTimeInJSON().date,
      time: dateFunction.getCurrentDateTimeInJSON().time,
    });
    await newClient.save();
    return res.json(newClient);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsDelete = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    await Clients.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Client deleted' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsPost = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const client = await Clients.findById(req.params.id);
    client.name = req.body.name;
    client.phone = req.body.phone;
    await client.save();
    return res.json(client);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.sellPost = async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.user_level !== 1) {
      return res.status(400).json({ message: 'You are not admin' });
    }
    const product = await Products.findById(req.body.id);
    product.saled = true;
    product.saledPrice = req.body.saledPrice;
    product.saledClient = new mongoose.Types.ObjectId(req.body.client);
    product.saledDate = dateFunction.getCurrentDateTimeInJSON().date;
    product.saledTime = dateFunction.getCurrentDateTimeInJSON().time;
    product.saledType = req.body.saledType;
    await product.save();
    return res.json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
