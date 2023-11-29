const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
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
  saledClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
  },
  saledType: {
    type: String,
  },
  saledDate: {
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  saledTime: {
    hour: {
      type: Number,
    },
    minute: {
      type: Number,
    },
    second: {
      type: Number,
    },
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
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  time: {
    hour: {
      type: Number,
    },
    minute: {
      type: Number,
    },
    second: {
      type: Number,
    },
  },
});
const Products = mongoose.model('products', productSchema);

module.exports = Products;
