const mongoose = require('mongoose');

const harajatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  editedID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'harajat',
  },
  editedFrom: {
    name: {
      type: String,
    },
    amount: {
      type: Number,
    },
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
const HarajatHistoryEdited = mongoose.model('harajatHistoryEdited', harajatSchema);

module.exports = HarajatHistoryEdited;
