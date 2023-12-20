const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const ExcelJS = require('exceljs');
const moment = require('moment');
const Users = require('../models/Users');
const Harajats = require('../models/Harajats');
const HarajatHistoryDeleted = require('../models/HarajatsHistoryDeleted');
const HarajatHistoryEdited = require('../models/HarajatsHistoryEdited');
const Sklads = require('../models/Sklad');
const Products = require('../models/Products');
const Clients = require('../models/Clients');
const Saleds = require('../models/Saleds');
const Debts = require('../models/Debts');
const Sellers = require('../models/Sellers');
const { formatTime } = require('../functions/formatTime');
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
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '12h',
      },
    );
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
    const harajat = new Harajats({
      name: req.body.name,
      amount: req.body.amount,
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
    const { date } = req.body;
    const harajat = await Harajats.find({ date });
    return res.json(harajat);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatDelete = async (req, res) => {
  try {
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
exports.harajatFinder = async (req, res) => {
  try {
    const regexPattern = new RegExp(req.body.search, 'i');

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDay() - 31);

    const startDate = req.body.startDate || threeDaysAgo;
    const endDate = req.body.endDate || new Date();

    const results = await Harajats.find({
      name: regexPattern,
      date: {
        $gte: startDate, $lte: endDate,
      },
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
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
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
    let worksheet = workbook.addWorksheet(`Yillik ${new Date().getFullYear()}`);
    const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${currentYear}-12-31T23:59:59.999Z`);

    let harajats = await Harajats.find({
      date: {
        $gte: startOfYear,
        $lte: endOfYear,
      },
    });

    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Harajat Nomi';
    worksheet.getCell(1, 3).value = 'Summasi';
    worksheet.getCell(1, 4).value = 'Sanasi va Vaqti';
    let totalAmount = 0;
    harajats.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name || '';
      worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
      worksheet.getCell(index + 2, 4).value = formatTime(item.date);
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

    worksheet = workbook.addWorksheet(`Oylik ${currentMonth.toString().padStart(2, '0')}`);
    harajats = await Harajats.find({
      date: {
        $gte: new Date(`${currentYear}-${currentMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`),
        $lte: new Date(`${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate()}T23:59:59.999Z`),
      },
    });
    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Harajat Nomi';
    worksheet.getCell(1, 3).value = 'Summasi';
    worksheet.getCell(1, 4).value = 'Sanasi va Vaqti';
    totalAmount = 0;
    harajats.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name || '';
      worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
      worksheet.getCell(index + 2, 4).value = formatTime(item.date);
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

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const startDateFormatted = `${sevenDaysAgo.getDate()}.${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}.${sevenDaysAgo.getFullYear()}`;
    const endDateFormatted = `${new Date().getDate()}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getFullYear()}`;

    worksheet = workbook.addWorksheet(`Haftalik ${startDateFormatted} - ${endDateFormatted}`);
    harajats = await Harajats.find({
      date: {
        $gte: sevenDaysAgo,
        $lte: new Date(),
      },
    });
    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Harajat Nomi';
    worksheet.getCell(1, 3).value = 'Summasi';
    worksheet.getCell(1, 4).value = 'Sanasi va Vaqti';

    totalAmount = 0;
    harajats.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name || '';
      worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
      worksheet.getCell(index + 2, 4).value = formatTime(item.date);

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
exports.harajatExcelByDate = async (req, res) => {
  try {
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
    const startOfYear = new Date(req.query.startDate || new Date(`${new Date().getFullYear()}-01-01T00:00:00.000Z`));
    const endOfYear = new Date(req.query.endDate || new Date());
    const startDateFormatted = `${startOfYear.getDate()}.${(startOfYear.getMonth() + 1).toString().padStart(2, '0')}.${startOfYear.getFullYear()}`;
    const endDateFormatted = `${endOfYear.getDate()}.${(endOfYear.getMonth() + 1).toString().padStart(2, '0')}.${endOfYear.getFullYear()}`;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${startDateFormatted} - ${endDateFormatted}`);

    const harajats = await Harajats.find({
      date: {
        $gte: startOfYear,
        $lte: endOfYear,
      },
    });

    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Harajat Nomi';
    worksheet.getCell(1, 3).value = 'Summasi';
    worksheet.getCell(1, 4).value = 'Sanasi va Vaqti';
    let totalAmount = 0;
    harajats.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name || '';
      worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
      worksheet.getCell(index + 2, 4).value = formatTime(item.date);
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
    const sklad = await Sklads.find();
    return res.json(sklad);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladPut = async (req, res) => {
  try {
    const newSklad = new Sklads({
      name: req.body.name,
    });
    await newSklad.save();
    return res.json(newSklad);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladDelete = async (req, res) => {
  try {
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
            cut: '$cut',
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
          cut: '$_id.cut',
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
            cut: '$cut',
          },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $project: {
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
          cut: '$_id.cut',
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
    for (let i = 0; i < req.body.quantity; i += 1) {
      try {
        const newProduct = new Products({
          name: req.body.name,
          sellerId: req.body.sellerId,
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
    const productsDate = await Saleds.aggregate([
      {
        $match: {
          clientId: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: 'clientId',
          foreignField: '_id',
          as: 'clientId',
        },
      },
      {
        $unwind: '$clientId',
      },
      {
        $sort: {
          'date.year': -1,
          'date.month': -1,
          'date.day': -1,
        },
      },
      {
        $limit: 50,
      },
    ]);

    const uniqueDates = Array.from(new Set(productsDate.map((product) => {
      const { day, month, year } = product.date;
      return `${day}-${month}-${year}`;
    })));
    return res.json({ dates: uniqueDates, products: productsDate });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.productsGetClientsByDate = async (req, res) => {
  try {
    const products = await Saleds.find({
      clientId: new mongoose.Types.ObjectId(req.params.id),
      date: {
        day: req.body.date.day,
        month: req.body.date.month,
        year: req.body.date.year,
      },
    }).populate('clientId');
    return res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsGetSaled = async (req, res) => {
  try {
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
exports.getProductId = async (req, res) => {
  try {
    const product = await Products.findOne(req.body);
    return res.json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productPut = async (req, res) => {
  try {
    const product = await Products.findOne(req.body.product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const productData = { ...product.toObject() };
    const filter = { ...productData };
    delete filter._id;
    delete filter.date;
    delete filter.time;
    for (let i = 0; i < req.body.quantity; i += 1) {
      try {
        const pr = await Products.findOne(filter);
        pr.saledPrice = req.body.saledPrice;
        await pr.save();
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    return res.json({ saved: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.getProductsWithDebts = async (req, res) => {
  try {
    const productsDate = await Debts.aggregate([
      {
        $match: {
          clientId: new mongoose.Types.ObjectId(req.params.id),
          active: true,
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: 'clientId',
          foreignField: '_id',
          as: 'clientId',
        },
      },
      {
        $unwind: '$clientId',
      },
      {
        $sort: {
          'date.year': -1,
          'date.month': -1,
          'date.day': -1,
        },
      },
      {
        $limit: 50,
      },
    ]);

    const uniqueDates = Array.from(new Set(productsDate.map((product) => {
      const { day, month, year } = product.date;
      return `${day}-${month}-${year}`;
    })));
    return res.json({ dates: uniqueDates, products: productsDate });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.postProductsInfo = async (req, res) => {
  try {
    const saled = await Saleds.findById(req.params.id).populate('clientId');
    return res.json(saled);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.postProductsDebt = async (req, res) => {
  try {
    const debt = await Debts.findById(req.params.id).populate('clientId');
    return res.json(debt);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.putProductsDebt = async (req, res) => {
  try {
    if (req.body.amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    const update = await Debts.findOne({ _id: req.params.id }).populate('clientId');
    if (!update) {
      return res.status(404).json({ message: 'Product not found' });
    }
    let date = new Date();
    date = moment(date).format();
    update.historyAmount.push({
      clientSaved: req.body.clientSaved,
      payedType: req.body.payedType,
      amount: req.body.amount,
      date,
    });
    update.payedAmount += req.body.amount;
    if (update.payedAmount === update.allAmount) {
      const newSaled = new Saleds({
        clientId: update.clientId,
        sellerId: update.sellerId,
        products: update.products,
        allAmount: update.allAmount,
        type: "Qarz(To'langan)",
        debt: update,
      });
      await newSaled.save();
      update.active = false;
      await update.save();
    }
    await update.save();
    return res.json({ saved: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsGetSeller = async (req, res) => {
  try {
    const products = await Products.aggregate([
      {
        $match: { saled: false, sellerId: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $group: {
          _id: {
            name: '$name',
            sellerId: '$sellerId',
            qalinligi: '$qalinligi',
            qalinligi_ortasi: '$qalinligi_ortasi',
            category: '$category',
            holati: '$holati',
            uzunligi: '$uzunligi',
            uzunligi_x: '$uzunligi_x',
            olchamlari: '$olchamlari',
            uzunligi_y: '$uzunligi_y',
            sklad: '$sklad',
            cut: '$cut',
            price: '$price',
            saledPrice: '$saledPrice',
          },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          name: '$_id.name',
          sellerId: '$_id.sellerId',
          qalinligi: '$_id.qalinligi',
          qalinligi_ortasi: '$_id.qalinligi_ortasi',
          category: '$_id.category',
          holati: '$_id.holati',
          uzunligi: '$_id.uzunligi',
          uzunligi_x: '$_id.uzunligi_x',
          uzunligi_y: '$_id.uzunligi_y',
          sklad: '$_id.sklad',
          cut: '$_id.cut',
          price: '$_id.price',
          olchamlari: '$_id.olchamlari',
          saledPrice: '$_id.saledPrice',
          quantity: '$totalQuantity',
          date: '$_id.date',
        },
      },
      {
        $limit: 50,
      },
    ]);
    await Products.populate(products, {
      path: 'sellerId',
    });
    await Products.populate(products, {
      path: 'sklad',
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsPostSeller = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDay() - 31);

    const startDate = req.body.startDate || threeDaysAgo;
    const endDate = req.body.endDate || new Date();

    const products = await Products.find({
      sellerId: new mongoose.Types.ObjectId(req.params.id),
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladExcelGet = async (req, res) => {
  try {
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
    const clients = await Clients.find();
    return res.json(clients);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsGetById = async (req, res) => {
  try {
    const client = await Clients.findById(req.params.id);
    return res.json(client);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsPut = async (req, res) => {
  try {
    const newClient = new Clients({
      name: req.body.name,
      phone: req.body.phone,
    });
    await newClient.save();
    return res.json(newClient);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsDelete = async (req, res) => {
  try {
    await Clients.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Client deleted' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.clientsPost = async (req, res) => {
  try {
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
    if (req.body.saledType !== 'Qarz') {
      const newSaled = new Saleds({
        clientId: new mongoose.Types.ObjectId(req.body.client._id),
        sellerId: new mongoose.Types.ObjectId(req.body.seller._id),
        products: req.body.products,
        allAmount: req.body.total,
        type: req.body.saledType,
      });
      await newSaled.save();
    } else {
      const newDebts = new Debts({
        sellerId: new mongoose.Types.ObjectId(req.body.seller._id),
        clientId: new mongoose.Types.ObjectId(req.body.client._id),
        products: req.body.products,
        allAmount: req.body.total,
      });
      await newDebts.save();
    }
    for (let i = 0; i < req.body.products.length; i += 1) {
      const { quantity } = req.body.products[i];
      req.body.products[i].quantity = 1;
      req.body.products[i].saled = false;
      req.body.products[i].sklad = new mongoose.Types.ObjectId(req.body.products[i].sklad);
      const product = await Products.findOne(req.body.products[i]);
      const productData = { ...product.toObject() };
      const filter = { ...productData };
      delete filter._id;
      for (let j = 0; j < quantity; j += 1) {
        let date = new Date();
        date = moment(date).format();
        const p = await Products.findOne(filter);
        p.saled = true;
        p.saledPrice = req.body.products[i].saledPrice;
        p.saledClient = new mongoose.Types.ObjectId(req.body.client._id);
        p.saledType = req.body.saledType;
        p.saledDate = date;
        await p.save();
      }
    }
    return res.json({ saved: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.sellerGet = async (req, res) => {
  try {
    const sellers = await Sellers.find();
    return res.json(sellers);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Sellers.findById(req.params.id);
    return res.json(seller);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.sellerPut = async (req, res) => {
  try {
    const seller = new Sellers({
      name: req.body.name,
      phone: req.body.phone,
    });
    await seller.save();
    return res.json(seller);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.sellerDelete = async (req, res) => {
  try {
    await Sellers.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Seller deleted' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.sellerPost = async (req, res) => {
  try {
    const seller = await Sellers.findById(req.params.id);
    seller.name = req.body.name;
    seller.phone = req.body.phone;
    await seller.save();
    return res.json(seller);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.cutPost = async (req, res) => {
  try {
    const product = await Products.findOne(req.body.product);
    product.cut = true;
    product.uzunligi = req.body.cut;
    await product.save();
    const newProduct = new Products(req.body.product);
    newProduct.cut = true;
    newProduct.uzunligi = (newProduct.uzunligi - req.body.cut).toFixed(2);
    newProduct.quantity = 1;
    await newProduct.save();
    return res.json({ cutted: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.getSellerProducts = async (req, res) => {
  try {
    console.log(req.body);
    const products = await Saleds.find({
      sellerId: new mongoose.Types.ObjectId(req.params.id),
      date: {
        $gte: req.body.startDate,
        $lte: req.body.endDate,
      },
    })
      .sort({ date: -1 })
      .populate('clientId')
      .populate('sellerId')
      .limit(50);

    const debtsQuery = {
      sellerId: req.params.id,
    };

    const debts = await Debts.find(debtsQuery)
      .sort({ _id: -1 })
      .populate('sellerId')
      .populate('clientId')
      .limit(50);

    return res.json({ products, debts });
  } catch (error) {
    return res.status(500).json(error);
  }
};
