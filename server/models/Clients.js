const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

clientsSchema.set('timestamps', true);

const Clients = mongoose.model('client', clientsSchema);

module.exports = Clients;
