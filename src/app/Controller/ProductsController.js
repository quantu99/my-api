const Products = require('../Model/Products')
const User = require('../Model/User')
const ProductsController = {
    // create new product
    createNewProducts: async(req,res)=>{
        try{
            const newProduct = await new Products(req.body)
            const product = await newProduct.save();
            return res.status(200).json(product) 
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    // get all product
    getAllProducts: async(req,res)=>{
        try{
            const products = await Products.find()
            return res.status(200).json(products)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    // get product detail
    getProductDetail: async(req,res)=>{
        try{
        const product = await Products.findById(req.params.id)
        return res.status(200).json(product)
        }
        catch(err){
        return res.status(500).json(err)   
        }
    },
    // update product
    updateProduct: async(req,res)=>{
        try{
            const product = await Products.findById(req.params.id)
            await product.updateOne({$set: {
                name: req.body.name,
                type:req.body.type,
                color:req.body.color,
                price:req.body.price,
                imageUrl:req.body.imageUrl,
                imageUrl2:req.body.imageUrl2,
                description:req.body.description
            }})
            res.status(200).json('Update successful')
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    addProductToCart: async(req,res)=>{
        try{
            const product = await Products.findById(req.params.id)
            await product.updateOne({$set:{
                user: req.body.user
            }})
            if(req.body.user){
                const user = User.findById(req.body.user)
                await user.updateOne({$push: { cart: product._id }})
            }
            return res.status(200).json('add successful') 
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    deleteProductFromCart: async (req, res) => {
        try {
          const product = await Products.findById(req.params.id);
          
          if (!product) {
            return res.status(404).json('Product not found');
          }
          
          if (req.body.user) {
            const user = await User.findById(req.body.user);
            
            if (!user) {
              return res.status(404).json('User not found');
            }
            
            const cart = user.cart;
            const productIndex = cart.findIndex(item => item.toString() === req.params.id);
      
            if (productIndex !== -1) {
              cart.splice(productIndex, 1);
              await user.save();
              return res.status(200).json('Update successful');
            }
          }
          
          return res.status(400).json('Invalid request');
        } catch (error) {
          return res.status(500).json('Internal server error');
        }
      },
    addProductToWish: async(req,res)=>{
        try{
            const product = await Products.findById(req.params.id)
            await product.updateOne({$set:{
                user: req.body.user
            }})
            if(req.body.user){
                const user = User.findById(req.body.user)
                await user.updateOne({$push: { wish: product._id }})
            }
            return res.status(200).json('add successful') 
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    deleteProductFromWish: async (req, res) => {
        try {
          const product = await Products.findById(req.params.id);
          
          if (!product) {
            return res.status(404).json('Product not found');
          }
          
          if (req.body.user) {
            const user = await User.findById(req.body.user);
            
            if (!user) {
              return res.status(404).json('User not found');
            }
            
            const wish = user.wish;
            const productIndex = wish.findIndex(item => item.toString() === req.params.id);
      
            if (productIndex !== -1) {
              wish.splice(productIndex, 1);
              await user.save();
              return res.status(200).json('Update successful');
            }
          }
          
          return res.status(400).json('Invalid request');
        } catch (error) {
          console.error(error);
          return res.status(500).json('Internal server error');
        }
      },
    destroyProduct:async(req,res)=>{
        try{
            await Products.findByIdAndDelete(req.params.id)
            return res.status(200).json('destroy successful')
        }
        catch(err){
            return res.status(500).json(err)
        }
    }
}
module.exports = ProductsController