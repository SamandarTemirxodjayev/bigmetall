const mongoose = require('mongoose');

const harajatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  deletedFrom: {
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
const HarajatHistoryDeleted = mongoose.model('harajatHistoryDeleted', harajatSchema);

module.exports = HarajatHistoryDeleted;
