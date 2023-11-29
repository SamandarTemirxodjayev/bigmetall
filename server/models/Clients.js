const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
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
const Clients = mongoose.model('client', clientsSchema);

module.exports = Clients;
