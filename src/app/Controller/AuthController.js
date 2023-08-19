const User = require('../Model/User');
const Products = require('../Model/Products')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
let refreshTokens = [];
const AuthController = {
    send: (req,res)=>{
        res.send('THis is auth')
    },
    // register
    registerUser: async(req,res) => {
       try{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        // Create new user:
        const newUser = await new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address:req.body.address,
            username: req.body.username,
            email: req.body.email,
            password: hashed,
            phone: req.body.phone,
            cardNumber:req.body.cardNumber,
            cardMonth:req.body.cardMonth,
            cardYear:req.body.cardYear,
            cvv:req.body.cvv
        })
        // Save user
        const user = await newUser.save()
        return res.status(200).json(user)
       }
       catch(err){
       return res.status(500).json(err)
       }
        
    },
    // create access Token
    createAccessToken: (user)=>{
        return jwt.sign(
            {
                id:user.id,
                admin:user.admin
            },
            process.env.JWT_ACCESSKEY,
            {expiresIn: '20d'}
        )
    },
    // create refresh Token
    createRefreshToken: (user)=>{
        return jwt.sign(
            {
                id:user.id,
                admin:user.admin
            },
            process.env.JWT_REFRESHKEY,
            {expiresIn: '365d'}
        )
    },
    // login
    loginUser: async(req,res)=>{
       try{
        const user = await User.findOne({username: req.body.username}).populate('cart')
        if(!user){
            return res.status(404).json('Wrong username')
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            return res.status(404).json('Wrong password')
        }
        if(user && validPassword){
            const accessToken = AuthController.createAccessToken(user);
            const refreshToken = AuthController.createRefreshToken(user);
            res.cookie('refreshToken', refreshToken,{
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite:'strict'
            })
            const{password,...others}=user._doc;
            return res.status(200).json({...others, accessToken})
        }
       }
       catch(err){
        return res.status(500).json(err)
       } 
    },
    // req Refresh Token
    requestRefreshToken: async(req,res)=>{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You're not authenticated")
        if(!refreshToken.includes(refreshToken)){
            return res.status(403).json('Refresh token is not valid')
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESHKEY, (err,user)=>{
            if(err){
                console.log(err)
            }
        refreshTokens.filter((token)=> token !== refreshToken)
        const newAccessToken = AuthController.createAccessToken(user);
        const newRefreshToken = AuthController.createRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken,
        {
            httpOnly:true,
            secure:false,
            path:'/',
            sameSite:'strict'
        })
        res.status(200).json({accessToken: newAccessToken})
        })        
    },
    // Logout
    logoutUser: async(req,res)=>{
        res.clearCookie('refreshToken')
        refreshTokens = refreshTokens.filter((token)=> token !== req.cookies.refreshToken);
        return res.status(200).json('log out success')
    },
    // Update user info
    updateInfo: async(req,res)=>{
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const user = await User.findById(req.params.id)
            await user.updateOne({$set: {
                password: hashed
            }})
            res.status(200).json('Update info successful')
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    getCart: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('cart');
            if (user) {
                const cart = user.cart;
                return res.status(200).json(cart);
            }
            return res.status(404).json({ message: "User not found" });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    addToOrder: async (req, res) => {
        try {
          const user = await User.findById(req.params.id);
          if(user){
            const cart = user.cart
            await user.updateOne({ $push: { order: cart }, $set: { cart: [] } });
            return res.status(200).json('order successful');
          }
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    getWish: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('wish');
            if (user) {
                const wish = user.wish;
                return res.status(200).json(wish);
            }
            return res.status(404).json({ message: "User not found" });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    getOrder:async(req,res)=>{
        try{
          const user = await User.findById(req.params.id).populate('order');
            if(!user){
                return res.status(404).json('User not found')}
            else if(user){
                const order = user.order;
                return res.status(200).json(order);
            }
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    updateInfoOrder: async(req,res)=>{
        try{
            const user = await User.findById(req.params.id)
            await user.updateOne({$set: {
                email: req.body.email,
                phone: req.body.phone,
                address:req.body.address,
                cardNumber:req.body.cardNumber,
                cardMonth:req.body.cardMonth,
                cardYear:req.body.cardYear,
                cvv:req.body.cvv,
                orderProgress:req.body.orderProgress
            }})
            res.status(200).json('Update info order successful')
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    } 
}
module.exports = AuthController;