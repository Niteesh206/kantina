const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = Slot = mongoose.model('slots', SlotSchema);

// {
//   "title": "Morning Slot",
//   "time": "8:00 AM - 9:00 AM"
// }
