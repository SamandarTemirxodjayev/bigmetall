const mongoose = require('mongoose');

const harajatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
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
const Harajats = mongoose.model('harajat', harajatSchema);

module.exports = Harajats;
