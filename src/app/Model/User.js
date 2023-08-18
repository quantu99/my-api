const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
    firstname:{
    type:String
    },
    lastname:{
    type:String
    },
    address:{
    type:String
    },
    username: 
    {type:String,
     require:true,
     unique: true},
    email:
    {type:String,
    require:true, 
    unique: true},
    password:
    {type:String,
    require:true},
    admin:
    {type:Boolean,
    default:false},
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Products"
        }
    ],
    wish:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Products"
        }
    ],
    order: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        }],
        default: []
    },
    phone:{
    type:Number
    },
    cardNumber:{
    type:Number,
    minLength:9,
    maxLength: 18
    },
    cardMonth:{
    type:Number
    },
    cardYear:{
        type:Number
    },
    cvv:{
        type:Number,
        minLength:3,
        maxLength:4
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('User', User);