const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Products = require('./Products')
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
    ]
},
{
    timestamps:true
})
module.exports = mongoose.model('User', User);