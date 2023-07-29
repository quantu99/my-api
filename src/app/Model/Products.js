const mongoose = require('mongoose');
const Schema= mongoose.Schema;
let Products = new Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    },
    imageUrl2:{
        type: String,
    },
    type:[type= String, require=true],
    color:{type:String,require:true},
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    } 
})
module.exports= mongoose.model('Products',Products)