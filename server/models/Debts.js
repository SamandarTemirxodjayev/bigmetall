const mongoose = require('mongoose');

const debtsSchema = new mongoose.Schema({
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
  payedAmount: {
    type: Number,
    default: 0,
  },
  historyAmount: {
    type: Array,
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
const Debts = mongoose.model('debts', debtsSchema);

module.exports = Debts;
