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
  }
});
module.exports = mongoose.model('Order', Order);