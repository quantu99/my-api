const Order = require('../Model/Order')
const User = require('../Model/User')
const OrderController = {
    addNewOrder:  async (req, res) => {
        try {
          
          const user = await User.findById(req.body.userId);
          const cart = user.cart;
          const order = new Order({
            user: req.body.userId,
            products: cart
          });
          const savedOrder = await order.save();
          user.cart = [];
          await user.save();
          return res.status(201).json(savedOrder);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
      getAllOrder: async(req,res)=>{
        try{
            const allOrder = await Order.find();
            return res.status(200).json(allOrder)
        }
        catch(err){
            res.status(500).json(err)
        }
      },
      getOrderDetail : async (req, res) => {
        try {
          const orderDetail = await Order.findById(req.params.id)
            .populate('products')
            .populate('user')
             // Populate 'products' field
      
          if (!orderDetail) {
            return res.status(404).json('Order does not exist');
          } else {
            return res.status(200).json(orderDetail);
          }
        } catch (err) {
          res.status(500).json({message:err.message})

        }
      },
      verifyOrder: async(req,res)=>{
        try{
          const order = await Order.findById(req.params.id);
          if(order){
            await order.updateOne({$set:{
              orderProgress: true,
              orderProcess: 'Order Processed',
            }})
            return res.status(200).json('verify order success')
          }
          else{
            return res.status(404).json('Order is not found');
          }
        }
        catch(err){
          res.status(500).json({message:err.message})
        }
      },
      editOrderProcess: async(req,res)=>{
        try{
          const order = await Order.findById(req.params.id)
          if(order){
            await order.updateOne({$set:{
              orderProcess: req.body.orderProcess
            }})
          return res.status(200).json('Edit order process successful')
          }
          else{
            return res.status(404).json('Order is not found')
          }
        }
        catch{err}{
          res.status(500).json({message:err.message})
        }
      },
      deleteOrder: async(req,res)=>{
        try{
          await Order.findByIdAndDelete(req.params.id)
          return res.status(200).json('delete successful')
        }
        catch(err){
        return res.status(500).json({message:err.message})
        }
      },
      verifyGetItem:async(req,res)=>{
        try{
          const order = await Order.findById(req.params.id)
          if(order){
            await order.updateOne({$set:{
             getItem: true
            }})
            return res.status(200).json('get item success')
          }
          else{
            return res.status(404).json('order is not found')
          }
        }
        catch(err){
          return res.status(500).json({message:err.message})
        }
      }
}
module.exports = OrderController;