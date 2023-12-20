const mongoose = require('mongoose');

const harajatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

harajatSchema.set('timestamps', true);

const Sklads = mongoose.model('sklad', harajatSchema);

module.exports = Sklads;
