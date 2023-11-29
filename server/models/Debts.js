const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema({
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
const Clients = mongoose.model('client', clientsSchema);

module.exports = Clients;
