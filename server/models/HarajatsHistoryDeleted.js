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
});

harajatSchema.set('timestamps', true);

const HarajatHistoryDeleted = mongoose.model('harajatHistoryDeleted', harajatSchema);

module.exports = HarajatHistoryDeleted;
