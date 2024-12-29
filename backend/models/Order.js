const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  slotId: {
    type: Schema.Types.ObjectId,
    ref: 'slots',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model('orders', OrderSchema);
