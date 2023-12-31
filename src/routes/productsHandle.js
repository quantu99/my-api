const express = require('express');
const router = express.Router();
const productsController = require('../app/Controller/ProductsController');
router.post('/create',productsController.createNewProducts);
router.get('/:id',productsController.getProductDetail)
router.put('/:id',productsController.updateProduct)
router.put('/add/:id',productsController.addProductToCart)
router.put('/delete/:id',productsController.deleteProductFromCart)
router.put('/add/wish/:id',productsController.addProductToWish)
router.put('/delete/wish/:id',productsController.deleteProductFromWish)
router.delete('/:id',productsController.destroyProduct);
router.get('/',productsController.getAllProducts)
module.exports= router