const mongoose = require('mongoose');

const harajatSchema = new mongoose.Schema({
  name: {
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
const Sklads = mongoose.model('sklad', harajatSchema);

module.exports = Sklads;
