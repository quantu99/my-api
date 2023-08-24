const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderHistory = new Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true
    }
  ],
  orderDate: {
    type: Date,
    default: Date.now
  },
  orderProgress:{
    type:Boolean,
    default:false
  },
  orderProcess:{
    type: String,
    default:"not verified"
  },
  getItem:{
    type:Boolean,
    default:false
  }
});
module.exports = mongoose.model('Order History', OrderHistory);
