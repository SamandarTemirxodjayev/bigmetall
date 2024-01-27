const mongoose = require('mongoose');

const sellersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

sellersSchema.set('timestamps', true);

const Sellers = mongoose.model('seller', sellersSchema);

module.exports = Sellers;
