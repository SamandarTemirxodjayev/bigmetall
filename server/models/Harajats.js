const mongoose = require('mongoose');

const harajatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

harajatSchema.set('timestamps', true);

const Harajats = mongoose.model('harajat', harajatSchema);

module.exports = Harajats;
