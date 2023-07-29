const User = require('../Model/User')
let refreshTokens = [];
const UserController = {
    // get all users
    getAllUsers: async(req,res)=>{
        try{
            const allProducts = await User.find()
            return res.status(200).json(allProducts)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    // delete user
    deleteUser: async(req,res)=>{
        try{
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json('Delete successful')
        }
        catch(err){
         return  res.status(500).json(err)
        }
    },
    // get user detail
    getUser: async(req,res)=>{
        try{
            const user = await User.findById(req.params.id).populate('cart')
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = UserController;