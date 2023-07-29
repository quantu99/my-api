const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const dotenv = require('dotenv');
dotenv.config();
const MiddlewareController = {
    verifyToken: (req,res,next)=>{
    const token = req.headers.token;
    if(token){
        const accessToken = token.split(" ")[1]
        jwt.verify(accessToken, process.env.JWT_ACCESSKEY,(err,user)=>{
            if(err){
                console.log(err)
            }
            req.user = user;
            next()
        })
    }
    else{
    return res.status(401).json("You're not authenticated")
    }   
    },
    verifyTokenAndAdmin : (req,res,next)=>{
        MiddlewareController.verifyToken(req,res,()=>{
            if(req.user.id == req.params.id || req.user.admin){
                next()
            }
            else{
                return res.status(403).json("You're not allowed to delete others")
            }
        })
    }
}
module.exports = MiddlewareController;