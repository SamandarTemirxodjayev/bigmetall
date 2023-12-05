const mongoose = require('mongoose');

const saledsSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
  },
  products: {
    type: Array,
  },
  allAmount: {
    type: Number,
  },
  type: {
    type: String,
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
const Saleds = mongoose.model('saled', saledsSchema);

module.exports = Saleds;
