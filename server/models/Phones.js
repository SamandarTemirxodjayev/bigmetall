const mongoose = require('mongoose');

const phonesSchema = new mongoose.Schema({
  phone: {
    type: String,
  },
});

phonesSchema.set('timestamps', true);
const Phones = mongoose.model('phones', phonesSchema);

module.exports = Phones;
