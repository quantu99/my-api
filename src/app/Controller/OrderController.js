const Order = require('../Model/Order')
const User = require('../Model/User')
const OrderController = {
    addNewOrder:  async (req, res) => {
        try {
          // Find the user by ID
          const user = await User.findById(req.body.userId);
          // Get the cart array from the user
          const cart = user.cart;
          // Create a new order with the cart items
          const order = new Order({
            user: req.body.userId,
            products: cart
          });
          // Save the order to the database
          const savedOrder = await order.save();
          // Clear the cart array in the user document
          user.cart = [];
          await user.save();
          // Return the saved order as the response
          return res.status(201).json(savedOrder);
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'Internal server error' });
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
      getOrderDetail:async(req,res)=>{
        try{
            const orderDetail = await Order.findById(req.params.id);
            if(!orderDetail){
                return res.status(404).json('Order is not exist')
            }
            else if(orderDetail){
                return res.status(200).json(orderDetail)
            }
        }
        catch(err){
            res.status(500).json(err)
        }
      }
}
module.exports = OrderController;