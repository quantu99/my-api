const OrderHistory = require ('../Model/OrderHistory')
const OrderHistoryController = {
    getAllOrderHistory: async(req,res)=>{
        try{
            const allOrderHistory = await OrderHistory.find().populate('user').populate('products');
            return res.status(200).json(allOrderHistory)
        }
        catch{
            res.status(500).json({message:err.message})
        }
    },
    getOrderHistoryDetail: async(req,res)=>{
        try{
            const orderHistoryDetail = await OrderHistory.findById(req.params.id).populate('user').populate('products');
            return res.status(200).json(orderHistoryDetail);
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    }
}
module.exports = OrderHistoryController