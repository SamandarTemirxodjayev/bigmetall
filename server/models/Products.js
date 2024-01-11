const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller',
  },
  qalinligi: {
    type: Number,
  },
  qalinligi_ortasi: {
    type: Number,
    default: 0,
  },
  olchamlari: {
    type: String,
    default: '',
  },
  category: {
    type: String,
  },
  holati: {
    type: String,
  },
  uzunligi: {
    type: Number,
  },
  uzunligi_y: {
    type: Number,
    default: 0,
  },
  uzunligi_x: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
  },
  sklad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sklad',
  },
  price: {
    type: Number,
  },
  saledPrice: {
    type: Number,
  },
  saledSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'seller',
  },
  saledClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
  },
  saledType: {
    type: String,
  },
  saledDate: {
    type: Date,
  },
  saled: {
    type: Boolean,
    default: false,
  },
  cut: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

productSchema.set('timestamps', true);

const Products = mongoose.model('products', productSchema);

module.exports = Products;
