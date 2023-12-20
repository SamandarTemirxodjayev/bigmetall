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
});

harajatSchema.set('timestamps', true);

const HarajatHistoryEdited = mongoose.model('harajatHistoryEdited', harajatSchema);

module.exports = HarajatHistoryEdited;
