const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Message = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageDate:{
        type: Date,
        default: Date.now
    },
    message:{type:String,required:true}  
})
module.exports = mongoose.model('Message', Message);
