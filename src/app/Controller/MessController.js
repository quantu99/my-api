const User = require('../Model/User');
const Message = require('../Model/Message')
const MessController = {
    addNewMess : async(req,res)=>{
        try{
            const user = await User.findById(req.body.userId);
            if(user){
                const message = new Message({
                    user:req.body.userId,
                    message: req.body.message
                })
                const savedMessage = await message.save();
                return res.status(200).json(savedMessage)
            }else{
                return res.status(404).json('User is not found')
            }
        }
        catch(err){
            return res.status(500).json({message:err.message})
        }
    },
    getAllMess: async(req,res)=>{
    try{
        const allMessage = await Message.find().populate('user');
        return res.status(200).json(allMessage)
    }
    catch(err){
    return res.status(500).json({message:err.message})
    }
    },
    getMessDetail:async(req,res)=>{
        try{
            const message = await Message.findById(req.params.id).populate('user');
            return res.status(200).json(message)
        }
        catch(err){
        return res.status(500).json({message:err.message})
        }
    }
}
module.exports = MessController