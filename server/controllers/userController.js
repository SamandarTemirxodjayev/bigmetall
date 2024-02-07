const jwt = require('jsonwebtoken');
const { generateUsername } = require("unique-username-generator");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
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
const Alerts = require('../models/Alerts');
require('dotenv').config();
const fs = require('fs');
const CompanyDebt = require('../models/CompanyDebts');

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
    const username = generateUsername(req.body.surname, 3, 15);
    const hashedPassword = await bcrypt.hash("admin", 13);
    const newUser = new Users({
      login: username,
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
exports.loginPatch = async (req, res) => {
  try {
    const existingUser = await Users.findOne({ login: req.body.username });
    if (existingUser) {
      return res.status(400).json({ error: 'invalid' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    const user = await Users.findById(req.userId);
    user.login = req.body.username;
    user.password = hashedPassword;
    await user.save();
    return res.json({ status: "success" });
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
exports.usersGetAll = async (req, res) => {
  try {
    const users = await Users.find().sort({ _id: -1 });
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.userDelete = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.deleteOne();
    return res.json({ message: 'User deleted' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.userPatch = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.user_level = req.body.user_level;
    await user.save();
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
      userId: req.userId,
      sklad: req.body.sklad,
    });
    await harajat.save();
    return res.json({ harajat });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatGet = async (req, res) => {
  try {
    const harajat = await Harajats.find().sort({ _id: -1 }).limit(req.query.limit).populate('sklad');
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
    harajat.name = req.body.name;
    harajat.amount = req.body.amount;
    harajat.sklad = new mongoose.Types.ObjectId(req.body.sklad);
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
    
    const filter = {
      name: regexPattern,
      date: {
        $gte: startDate, $lte: endDate,
      },
    };

    if (req.body.sklad) {
      filter.sklad = req.body.sklad;
    }

    const results = await Harajats.find(filter)
      .sort({ _id: -1 })
      .limit(req.query.limit)
      .populate('sklad');

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
    let sklads = await Sklads.find({
      active: true,
    });

    await Promise.all(sklads.map(async (sklad) => {
      let worksheet = workbook.addWorksheet(`${sklad.name}`);
      const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
      const endOfYear = new Date(`${currentYear}-12-31T23:59:59.999Z`);
      let harajats = await Harajats.find({
        date: {
          $gte: startOfYear,
          $lte: endOfYear,
        },
        sklad: sklad._id,
      }).populate('sklad');
      worksheet.getCell(1, 13).value = 'ID';
      worksheet.getCell(1, 14).value = 'Harajat Nomi';
      worksheet.getCell(1, 15).value = 'Summasi';
      worksheet.getCell(1, 16).value = 'Ombor';
      worksheet.getCell(1, 17).value = 'Sanasi va Vaqti';
      let totalAmount = 0;
      harajats.forEach((item, index) => {
        worksheet.getCell(index + 2, 13).value = index + 1;
        worksheet.getCell(index + 2, 14).value = item.name || '';
        worksheet.getCell(index + 2, 15).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
        worksheet.getCell(index + 2, 16).value = item.sklad.name;
        worksheet.getCell(index + 2, 17).value = formatTime(item.date);
        totalAmount += item.amount;
      });
      worksheet.getCell(harajats.length + 2, 14).value = 'Umumiy Harajat Summasi';
      worksheet.getCell(harajats.length + 2, 15).value = `${totalAmount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
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

      harajats = await Harajats.find({
        date: {
          $gte: new Date(`${currentYear}-${currentMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`),
          $lte: new Date(`${currentYear}-${currentMonth.toString().padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate()}T23:59:59.999Z`),
        },
        sklad: sklad._id,
      }).populate('sklad');
      worksheet.getCell(1, 7).value = 'ID';
      worksheet.getCell(1, 8).value = 'Harajat Nomi';
      worksheet.getCell(1, 9).value = 'Summasi';
      worksheet.getCell(1, 10).value = 'Ombor';
      worksheet.getCell(1, 11).value = 'Sanasi va Vaqti';
      totalAmount = 0;
      harajats.forEach((item, index) => {
        worksheet.getCell(index + 2, 7).value = index + 1;
        worksheet.getCell(index + 2, 8).value = item.name || '';
        worksheet.getCell(index + 2, 9).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
        worksheet.getCell(index + 2, 10).value = item.sklad.name;
        worksheet.getCell(index + 2, 11).value = formatTime(item.date);
        totalAmount += item.amount;
      });
      worksheet.getCell(harajats.length + 2, 8).value = 'Umumiy Harajat Summasi';
      worksheet.getCell(harajats.length + 2, 9).value = `${totalAmount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
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

      harajats = await Harajats.find({
        date: {
          $gte: sevenDaysAgo,
          $lte: new Date(),
        },
        sklad: sklad._id,
      }).populate('sklad');
      worksheet.getCell(1, 1).value = 'ID';
      worksheet.getCell(1, 2).value = 'Harajat Nomi';
      worksheet.getCell(1, 3).value = 'Summasi';
      worksheet.getCell(1, 4).value = 'Ombor';
      worksheet.getCell(1, 5).value = 'Sanasi va Vaqti';

      totalAmount = 0;
      harajats.forEach((item, index) => {
        worksheet.getCell(index + 2, 1).value = index + 1;
        worksheet.getCell(index + 2, 2).value = item.name || '';
        worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
        worksheet.getCell(index + 2, 4).value = item.sklad.name;
        worksheet.getCell(index + 2, 5).value = formatTime(item.date);

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
    }));
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

    let query = {
      date: {
        $gte: startOfYear,
        $lte: endOfYear,
      }
    };
    
    if (req.query.sklad) {
      query.sklad = req.query.sklad;
    }
    
    const harajats = await Harajats.find(query).populate('sklad');

    worksheet.getCell(1, 1).value = 'ID';
    worksheet.getCell(1, 2).value = 'Harajat Nomi';
    worksheet.getCell(1, 3).value = 'Summasi';
    worksheet.getCell(1, 4).value = 'Ombor';
    worksheet.getCell(1, 5).value = 'Sanasi va Vaqti';
    let totalAmount = 0;
    harajats.forEach((item, index) => {
      worksheet.getCell(index + 2, 1).value = index + 1;
      worksheet.getCell(index + 2, 2).value = item.name || '';
      worksheet.getCell(index + 2, 3).value = `${item.amount.toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
      worksheet.getCell(index + 2, 4).value = item.sklad.name;
      worksheet.getCell(index + 2, 5).value = formatTime(item.date);
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
exports.harajatYearGet = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const harajats = await Harajats.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${year}-01-01T00:00:00.000Z`),
            $lte: new Date(`${year + 1}-01-01T00:00:00.000Z`),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
        },
      },
    ]);

    const totalAmount = harajats.length > 0 ? harajats[0].totalAmount : 0;

    return res.json({ totalAmount });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.harajatYearGetGraph = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    const result = await Harajats.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${year}-01-01T00:00:00.000Z`),
            $lte: new Date(`${year + 1}-01-01T00:00:00.000Z`),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
          },
          totalAmount: {
            $sum: '$amount',
          },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.skladGet = async (req, res) => {
  try {
    const sklad = await Sklads.find({ active: true });
    return res.json(sklad);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladPatchPrice = async (req, res) => {
  try {
    const sklads = await Sklads.find({
      active: true,
    }).lean();

    await Promise.all(sklads.map( async (sklad) => {
      const result = await Products.aggregate([
        {
          $match: {
            saled: false,
            sklad: sklad._id,
          }
        },
        {
          $group: {
            _id: null,
            totalPrice: {
              $sum: {
                $cond: {
                  if: { $eq: ['$name', 'List'] },
                  then: {
                    $multiply: [ '$price',
                      {
                        $divide: [
                          { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                          10000,
                        ],
                      },
                    ],
                  },
                  else: { 
                    $multiply: [ '$price', '$uzunligi', ]},
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: '$totalPrice',
          },
        },
      ]);
      const totalAmount = result.length > 0 ? result[0].totalAmount : 0;
      sklad.totalAmount = totalAmount;
    }));
    return res.json(sklads);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.skladProductsPost = async (req, res) => {
  try {
    const products = await Products.aggregate([
      {
        $match: { 
          name: req.body.name,
          olchamlari: req.body.olchamlari,
          category: req.body.category,
          qalinligi: req.body.qalinligi,
          qalinligi_ortasi: req.body.qalinligi_ortasi,
          holati: req.body.holati,
          sklad: new mongoose.Types.ObjectId(req.body.sklad),
          saled: false,
        },
      },
      {
        $group: {
          _id: {
            name: '$name',
            qalinligi: '$qalinligi',
            qalinligi_ortasi: '$qalinligi_ortasi',
            category: '$category',
            holati: '$holati',
            olchamlari: '$olchamlari',
            sklad: '$sklad',
            uzunligi: '$uzunligi',
            uzunligi_x: '$uzunligi_x',
            uzunligi_y: '$uzunligi_y',
            price: '$price',
            saledPrice: '$saledPrice',
            cut: '$cut',
          },
          totalQuantity: { $sum: '$quantity' },
          totalUzunligi: { 
            $sum: {
              $cond: {
                if: { $eq: ['$name', 'List'] },
                then: {
                  $multiply: [ 1,
                    {
                      $divide: [
                        { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                        10000,
                      ],
                    },
                  ],
                },
                else: { 
                  $multiply: [ 1, '$uzunligi', ]},
              },
            },
          },
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
          totalUzunligi: '$totalUzunligi',
          cut: '$_id.cut',
        },
      },
      {
        $sort: {
          category: 1,
          olchamlari: 1,
          qalinligi: 1,
          qalinligi_ortasi: 1,
          uzunligi: 1,
          uzunligi_x: 1,
          uzunligi_y: 1,
          quantity: 1,
        }
      }
    ]);
    return res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
}
exports.skladsGet = async (req, res) => {
  try {
    const sklads = await Sklads.find();
    return res.json(sklads);
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
exports.skladDeleteProducts = async (req, res) => {
  try {
    const product = await Products.findOne(req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(req.body);
    console.log(product);
    await product.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
}
exports.skladDelete = async (req, res) => {
  try {
    const sklad = await Sklads.findById(req.params.id);
    if (!sklad) {
      return res.status(404).json({ message: 'Sklad not found' });
    }
    sklad.active = false;
    await sklad.save();
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
            olchamlari: '$olchamlari',
            sklad: '$sklad',
          },
          totalQuantity: { $sum: '$quantity' },
          totalUzunligi: { 
            $sum: {
              $cond: {
                if: { $eq: ['$name', 'List'] },
                then: {
                  $multiply: [ 1,
                    {
                      $divide: [
                        { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                        10000,
                      ],
                    },
                  ],
                },
                else: { 
                  $multiply: [ 1, '$uzunligi', ]},
              },
            },
          },
          minUzunligi: { $min: '$uzunligi' },
          maxUzunligi: { $max: '$uzunligi' },
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
          totalUzunligi: '$totalUzunligi',
          minUzunligi: '$minUzunligi',
          maxUzunligi: '$maxUzunligi',
          cut: '$_id.cut',
        },
      },
      {
        $sort: {
          olchamlari: 1,
          category: 1,
          qalinligi: 1,
          qalinligi_ortasi: 1,
          quantity: 1,
        }
      }
    ]);

    return res.json(aggregatedProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsExcelPost = async (req, res) => {
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
    const products = await Products.aggregate([
      {
        $match: { 
          name: req.body.name,
          olchamlari: req.body.olchamlari,
          category: req.body.category,
          qalinligi: req.body.qalinligi,
          qalinligi_ortasi: req.body.qalinligi_ortasi,
          holati: req.body.holati,
          sklad: new mongoose.Types.ObjectId(req.body.sklad),
          saled: false,
        },
      },
      {
        $group: {
          _id: {
            name: '$name',
            qalinligi: '$qalinligi',
            qalinligi_ortasi: '$qalinligi_ortasi',
            category: '$category',
            holati: '$holati',
            olchamlari: '$olchamlari',
            sklad: '$sklad',
            uzunligi: '$uzunligi',
            uzunligi_x: '$uzunligi_x',
            uzunligi_y: '$uzunligi_y',
            price: '$price',
            saledPrice: '$saledPrice',
            cut: '$cut',
          },
          totalQuantity: { $sum: '$quantity' },
          totalUzunligi: { 
            $sum: {
              $cond: {
                if: { $eq: ['$name', 'List'] },
                then: {
                  $multiply: [ 1,
                    {
                      $divide: [
                        { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                        10000,
                      ],
                    },
                  ],
                },
                else: { 
                  $multiply: [ 1, '$uzunligi', ]},
              },
            },
          },
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
          totalUzunligi: '$totalUzunligi',
          cut: '$_id.cut',
        },
      },
      {
        $sort: {
          category: 1,
          olchamlari: 1,
          qalinligi: 1,
          qalinligi_ortasi: 1,
          uzunligi: 1,
          uzunligi_x: 1,
          uzunligi_y: 1,
          quantity: 1,
        }
      }
    ]);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('MAHSULOTLAR');
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
    products.forEach((item, index) => {
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
    await workbook.xlsx.writeFile('./docs/MAHSULOTLAR.xlsx');
    return res.download('./docs/MAHSULOTLAR.xlsx');
  } catch (error) {
    return res.status(500).json(error);
  }
}
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
      {
        $sort: {
          name: 1,
          olchamlari: 1,
          category: 1,
          qalinligi: 1,
          qalinligi_ortasi: 1,
          quantity: 1,
          uzunligi: 1,
          uzunligi_x: 1,
          uzunligi_y: 1,
          saledPrice: 1,
        }
      }
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
          userId: req.userId,
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
          isDebt: req.body.isDebt,
        });
        newProduct.save();
        if(req.body.isDebt){
          const debt = await CompanyDebt.findOne({
            date: req.body.date,
            seller: req.body.seller,
            active: true,
          });
          if(debt){
            debt.products.push(newProduct);
            if (req.body.name === 'List') {
              debt.allAmount += (req.body.uzunligi_x * req.body.uzunligi_y)/10000 * req.body.price;
            } else {
              debt.allAmount += req.body.price * req.body.uzunligi;
            }
            await debt.save();
          }else{
            let newDebt = new CompanyDebt({
              date: req.body.date,
              seller: req.body.seller,
              products: [newProduct],
              allAmount: newProduct.price * req.body.quantity,
            });
            await newDebt.save();
          }
        }
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
    const product = await Products.findOne({ ...req.body, saled: false });
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
        $lookup: {
          from: 'sellers',
          localField: 'sellerId',
          foreignField: '_id',
          as: 'sellerId',
        },
      },
      {
        $unwind: '$sellerId',
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
exports.getProductsWithDebtsPrice = async (req, res) => {
  try {
    const result = await Debts.aggregate([
      {
        $match: {
          active: true,
        }
      },
      {
        $project: {
          totalDebt: { $subtract: ['$allAmount', '$payedAmount'] },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalDebt' },
        },
      },
    ]);

    const totalAmount = result.length > 0 ? result[0].totalAmount : 0;
    
    return res.status(200).json({result: totalAmount});
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.editProduct = async (req, res) => {
  try {
    for( let i = 0; i < req.body.to.quantity; i++ ){
      let update = await Products.findOne(req.body.from);
      if (!update) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if(req.body.to.qalinligi){
        update.qalinligi = req.body.to.qalinligi;
      }
      if(req.body.to.qalinligi_ortasi){
        update.qalinligi_ortasi = req.body.to.qalinligi_ortasi;
      }
      if(req.body.to.category){
        update.category = req.body.to.category;
      }
      if(req.body.to.olchamlari){
        update.olchamlari = req.body.to.olchamlari;
      }
      if(req.body.to.holati){
        update.holati = req.body.to.holati;
      }
      if(req.body.to.uzunligi){
        update.uzunligi = req.body.to.uzunligi;
      }
      if(req.body.to.uzunligi_x){
        update.uzunligi_x = req.body.to.uzunligi_x;
      }
      if(req.body.to.uzunligi_y){
        update.uzunligi_y = req.body.to.uzunligi_y;
      }
      if(req.body.to.sklad){
        update.sklad = new mongoose.Types.ObjectId(req.body.to.sklad);
      }
      if(req.body.to.price){
        update.price = req.body.to.price;
      }
      if(req.body.to.saledPrice){
        update.saledPrice = req.body.to.saledPrice;
      }

      await update.save();
    }

    return res.json({ message: 'Products updated successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsFinder = async (req, res) => {
  try {
    const category = new RegExp(req.body.category, 'i');
    const olchamlari = new RegExp(req.body.olchamlari, 'i');
    const query = {
      name: req.body.name,
      saled: false,
      category,
      olchamlari,
    }
    if(req.body.qalinligi){
      query.qalinligi = parseFloat(req.body.qalinligi);
    }
    if(req.body.qalinligi_ortasi){
      query.qalinligi_ortasi = parseFloat(req.body.qalinligi_ortasi);
    }
    if(req.body.holati){
      query.holati = req.body.holati;
    }
    const result = await Products.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: {
            name: '$name',
            qalinligi: '$qalinligi',
            qalinligi_ortasi: '$qalinligi_ortasi',
            category: '$category',
            holati: '$holati',
            olchamlari: '$olchamlari',
            sklad: '$sklad',
          },
          totalQuantity: { $sum: '$quantity' },
          totalUzunligi: {
            $sum: {
              $cond: {
                if: { $eq: ['$name', 'List'] },
                then: {
                  $multiply: [
                    1,
                    {
                      $divide: [
                        { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                        10000,
                      ],
                    },
                  ],
                },
                else: {
                  $multiply: [1, '$uzunligi'],
                },
              },
            },
          },
          minUzunligi: { $min: '$uzunligi' },
          maxUzunligi: { $max: '$uzunligi' },
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
          sklad: '$_id.sklad',
          olchamlari: '$_id.olchamlari',
          saledPrice: '$_id.saledPrice',
          quantity: '$totalQuantity',
          totalUzunligi: '$totalUzunligi',
          minUzunligi: '$minUzunligi',
          maxUzunligi: '$maxUzunligi',
        },
      },
      {
        $sort: {
          category: 1,
          qalinligi: 1,
          qalinligi_ortasi: 1,
          quantity: 1,
        },
      },
    ]);

    await Products.populate(result, {
      path: 'sklad',
    });
    
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
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
exports.skladPriceGet = async (req, res) => {
  try {
    const result = await Products.aggregate([
      {
        $match: {
          saled: false,
        }
      },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: {
              $cond: {
                if: { $eq: ['$name', 'List'] },
                then: {
                  $multiply: [ '$price',
                    {
                      $divide: [
                        { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                        10000,
                      ],
                    },
                  ],
                },
                else: { 
                  $multiply: [ '$price', '$uzunligi', ]},
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalAmount: '$totalPrice',
        },
      },
    ]);
    const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

    return res.json({ result: totalAmount });
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
const sellProduct = async (product, clientID, saledType, sellerID) => {
  const filter = { ...product };
  delete filter._id;

  for (let j = 0; j < product.quantity; j++) {
    delete filter.quantity;
    let date = new Date();
    date = moment(date).format();
    
    await Products.findOneAndUpdate(
      filter,
      {
        $set: {
          saled: true,
          saledPrice: product.saledPrice,
          saledClient: new mongoose.Types.ObjectId(clientID),
          saledType,
          saledDate: date,
          saledSeller: new mongoose.Types.ObjectId(sellerID),
        },
      }
    );
  }
};

exports.sellPost = async (req, res) => {
  try {
    const { client, seller, products, saledType, total } = req.body;

    for (const product of products) {
      product.saled = false;
      product.sklad = new mongoose.Types.ObjectId(product.sklad);
      await sellProduct(product, client._id, saledType, seller._id);
    }

    if (saledType !== 'Qarz') {
      const newSaled = new Saleds({
        clientId: new mongoose.Types.ObjectId(client._id),
        sellerId: new mongoose.Types.ObjectId(seller._id),
        products,
        allAmount: total,
        type: saledType,
      });
      await newSaled.save();
    } else {
      const newDebts = new Debts({
        sellerId: new mongoose.Types.ObjectId(seller._id),
        clientId: new mongoose.Types.ObjectId(client._id),
        products,
        allAmount: total,
      });
      await newDebts.save();
    }

    return res.json({ saved: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.sellerGet = async (req, res) => {
  try {
    const sellers = await Sellers.find({ active: true });
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
    const seller = await Sellers.findById(req.params.id);
    seller.active = false;
    await seller.save();
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
exports.getSellerResults = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 7);


    const startDate = req.body.startDate ? new Date(req.body.startDate) : threeDaysAgo;
    const endDate = req.body.endDate ? new Date(req.body.endDate) : new Date();

    const result = await Products.aggregate([
      {
        $match: {
          saledSeller: new mongoose.Types.ObjectId(req.params.id),
          saled: true,
          saledDate: {
            $exists: true,
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$saledDate' },
            month: { $month: '$saledDate' },
            day: { $dayOfMonth: '$saledDate' },
          },
          totalAmount: {
            $sum: {
              $multiply: [
                {
                  $cond: {
                    if: { $eq: ['$name', 'List'] },
                    then: {
                      $multiply: [
                        { $subtract: ['$saledPrice', '$price'] },
                        {
                          $divide: [
                            { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                            10000,
                          ],
                        },
                      ],
                    },
                    else: { 
                      $multiply: [
                        { $subtract: ['$saledPrice', '$price'] },
                        '$uzunligi',
                      ]},
                  },
                },
                1
              ],
            },
          },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);

    const result3 = await Products.aggregate([
      {
        $match: {
          saledSeller: new mongoose.Types.ObjectId(req.params.id),
          saled: true,
          saledDate: {
            $exists: true,
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$saledDate' },
            month: { $month: '$saledDate' },
            day: { $dayOfMonth: '$saledDate' },
          },
          totalAmount: {
            $sum: {
              $multiply: [
                {
                  $cond: {
                    if: { $eq: ['$name', 'List'] },
                    then: {
                      $multiply: [
                        '$price',
                        {
                          $divide: [
                            { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                            10000,
                          ],
                        },
                      ],
                    },
                    else: { 
                      $multiply: [
                        '$price',
                        '$uzunligi',
                      ]},
                  },
                },
              ],
            },
          },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);

    const result2 = await Products.aggregate([
      {
        $match: {
          sellerId: new mongoose.Types.ObjectId(req.params.id),
          date: {
            $exists: true,
            $type: 'date',
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
          },
          totalAmount: {
            $sum: {
              $cond: {
                if: { $eq: ['$name', 'List'] },
                then: {
                  $multiply: [ '$price',
                    {
                      $divide: [
                        { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                        10000,
                      ],
                    },
                  ],
                },
                else: { 
                  $multiply: [ '$price', '$uzunligi', ]},
              },
            },
          },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);

    return res.json({ sales: result, came: result2, sof: result3 });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.cutPost = async (req, res) => {
  try {
    const product = await Products.findOne(req.body.product);
    product.cut = true;
    product.uzunligi = parseFloat(req.body.cut);
    await product.save();
    const newProduct = new Products(req.body.product);
    newProduct.cut = true;
    newProduct.uzunligi = (parseFloat(newProduct.uzunligi) - parseFloat(req.body.cut)).toFixed(2);
    newProduct.quantity = 1;
    await newProduct.save();
    return res.json({ cutted: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.getSellerProducts = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDay() - 31);

    const startDate = req.body.startDate || threeDaysAgo;
    const endDate = req.body.endDate || new Date();
    const products = await Saleds.find({
      sellerId: new mongoose.Types.ObjectId(req.params.id),
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .sort({ date: -1 })
      .populate('clientId')
      .populate('sellerId')
      .limit(50);

    const debts = await Debts.find({
      sellerId: req.params.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .sort({ _id: -1 })
      .populate('sellerId')
      .populate('clientId')
      .limit(50);

    return res.json({ products, debts });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.noticesGet = async (req, res) => {
  try {
    const notices = await Alerts.find().populate('senderName').sort({ createdAt: -1 });
    return res.json(notices);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.noticesPut = async (req, res) => {
  try {
    const newNotice = new Alerts({
      senderName: new mongoose.Types.ObjectId(req.userId),
      text: req.body.text,
    });
    await newNotice.save();
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsYearGet = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const result = await Products.aggregate([
      {
        $match: {
          saled: true,
          saledDate: {
            $gte: new Date(`${year}-01-01T00:00:00.000Z`),
            $lte: new Date(`${year + 1}-01-01T00:00:00.000Z`),
          },
        },
      },
      {
        $project: {
          totalAmount: {
            $sum: {
              $multiply: [
                {
                  $cond: {
                    if: { $eq: ['$name', 'List'] },
                    then: {
                      $multiply: [
                        { $subtract: ['$saledPrice', '$price'] },
                        {
                          $cond: {
                            if: { $ne: ['$uzunligi_x', 0] },
                            then: {
                              $divide: [
                                { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                                10000,
                              ],
                            },
                            else: 0,
                          },
                        },
                      ],
                    },
                    else: {
                      $multiply: [
                        { $subtract: ['$saledPrice', '$price'] },
                        '$uzunligi',
                      ],
                    },
                  },
                },
                1,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalAmount' },
        },
      },
    ]);

    const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

    return res.json({ totalAmount });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.productsYearGetGraph = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    const result = await Products.aggregate([
      {
        $match: {
          saled: true,
          saledDate: {
            $gte: new Date(`${year}-01-01T00:00:00.000Z`),
            $lte: new Date(`${year + 1}-01-01T00:00:00.000Z`),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$saledDate' },
            month: { $month: '$saledDate' },
            day: { $dayOfMonth: '$saledDate' },
          },
          totalAmount: {
            $sum: {
              $multiply: [
                {
                  $cond: {
                    if: { $eq: ['$name', 'List'] },
                    then: {
                      $multiply: [
                        { $subtract: ['$saledPrice', '$price'] },
                        {
                          $divide: [
                            { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                            10000,
                          ],
                        },
                      ],
                    },
                    else: { 
                      $multiply: [
                        { $subtract: ['$saledPrice', '$price'] },
                        '$uzunligi',
                      ]},
                  },
                },
                1
              ],
            },
          },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.hisobotGet = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 7);


    const startDate = req.body.startDate ? new Date(req.body.startDate) : threeDaysAgo;
    const endDate = req.body.endDate ? new Date(req.body.endDate) : new Date();

    console.log(req.body)

    let query = {
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };
    if(req.body.sklad != 'Hammasi'){
      query.sklad = new mongoose.Types.ObjectId(req.body.sklad);
    }
    const harajat = await Harajats.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
          },
          totalAmount: {
            $sum: '$amount',
          },
          totalRecords: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);

    
    
    const kirimTushumi = await Products.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
          },
          totalAmount: {
            $sum: {
              $multiply: [
                {
                  $cond: {
                    if: { $eq: ['$name', 'List'] },
                    then: {
                      $multiply: [
                        '$price',
                        {
                          $divide: [
                            { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                            10000,
                          ],
                        },
                      ],
                    },
                    else: { 
                      $multiply: [
                        '$price',
                        '$uzunligi',
                      ]},
                  },
                },
              ],
            },
          },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);

    query.saled = true;

    const foyda = await Products.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            year: { $year: '$saledDate' },
            month: { $month: '$saledDate' },
            day: { $dayOfMonth: '$saledDate' },
          },
          totalAmount: {
            $sum: {
              $multiply: [
                {
                  $cond: {
                    if: { $eq: ['$name', 'List'] },
                    then: {
                      $multiply: [
                        { $subtract: ['$saledPrice', '$price'] },
                        {
                          $divide: [
                            { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                            10000,
                          ],
                        },
                      ],
                    },
                    else: { 
                      $multiply: [
                        { $subtract: ['$saledPrice', '$price'] },
                        '$uzunligi',
                      ]},
                  },
                },
                1
              ],
            },
          },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);

    const savdoTushumi = await Products.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            year: { $year: '$saledDate' },
            month: { $month: '$saledDate' },
            day: { $dayOfMonth: '$saledDate' },
          },
          totalAmount: {
            $sum: {
              $multiply: [
                {
                  $cond: {
                    if: { $eq: ['$name', 'List'] },
                    then: {
                      $multiply: [
                        '$saledPrice',
                        {
                          $divide: [
                            { $multiply: ['$uzunligi_x', '$uzunligi_y'] },
                            10000,
                          ],
                        },
                      ],
                    },
                    else: { 
                      $multiply: [
                        '$saledPrice',
                        '$uzunligi',
                      ]},
                  },
                },
              ],
            },
          },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ]);

    const netProfitMap = new Map();

    foyda.forEach((entry) => {
      const { year, month, day } = entry._id;
      const dateKey = `${year}-${month}-${day}`;

      const entryNetProfit = (netProfitMap.get(dateKey) || 0) + entry.totalAmount;
      netProfitMap.set(dateKey, entryNetProfit);
    });
    

    harajat.forEach((entry) => {
      const { year, month, day } = entry._id;
      const dateKey = `${year}-${month}-${day}`;

      const entryNetProfit = (netProfitMap.get(dateKey) || 0) - entry.totalAmount;
      netProfitMap.set(dateKey, entryNetProfit);
    });

    const sofFoyda = Array.from(netProfitMap, ([date, netProfit]) => ({
      _id: {
        day: new Date(date).getDate(),
        month: new Date(date).getMonth() + 1,
        year: new Date(date).getFullYear(),
      },
      totalAmount: netProfit,
    }));
    sofFoyda.sort((a, b) => {
      const dateA = a._id.year * 10000 + a._id.month * 100 + a._id.day;
      const dateB = b._id.year * 10000 + b._id.month * 100 + b._id.day;
    
      return dateA - dateB;
    });
    
    return res.json({ harajat, foyda, savdoTushumi, sofFoyda, kirimTushumi });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const readJsonFile = () => {
  try {
    const data = fs.readFileSync("./db/phone.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return {};
  }
};
exports.businessdebtGet = async (req, res) => {
  try {
    const result = await CompanyDebt.find({ active: true });
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.businessdebtByIdGet = async (req, res) => {
  try {
    const result = await CompanyDebt.findById(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.businessdebtByIdPost = async (req, res) => {
  try {
    const debt = await CompanyDebt.findById(req.params.id);
    if(!debt){
      return res.status(404).json({ message: "Company debt not found" });
    }
    let date = new Date();
    date = moment(date).format();
    debt.historyAmount.push({
      payedType: req.body.payedType,
      amount: req.body.amount,
      date,
    });
    debt.payedAmount += req.body.amount;
    if (debt.payedAmount === debt.allAmount) {
      debt.active = false;
      await debt.save();
    }
    await debt.save();
    return res.json(debt);
  } catch (error) {
    return res.status(500).json(error);
  }
}
exports.businessdebtTotalGet = async (req, res) => {
  try {
    const result = await CompanyDebt.aggregate([
      {
        $match: {
          active: true,
        }
      },
      {
        $project: {
          totalDebt: { $subtract: ['$allAmount', '$payedAmount'] },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalDebt' },
        },
      },
    ]);

    const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

    return res.json({ result: totalAmount });

  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.businessdebtPayedGet = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDay() - 7);
    const startDate = req.body.startDate || threeDaysAgo;
    const endDate = req.body.endDate || new Date();

    const result = await CompanyDebt.find({ 
      active: false,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      }
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}
exports.phoneGet = async (req, res) => {
  try {
    const data = readJsonFile();
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.phonePost = async (req, res) => {
  try {
    const data = req.body;
    fs.writeFileSync("./db/phone.json", JSON.stringify(data));
    return res.json({...data, status: "success"});
  } catch (error) {
    return res.status(500).json(error);
  }
}