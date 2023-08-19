const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  ],
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', Order);