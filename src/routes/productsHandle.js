const express = require('express');
const router = express.Router();
const productsController = require('../app/Controller/ProductsController');
router.post('/create',productsController.createNewProducts);
router.get('/:id',productsController.getProductDetail)
router.put('/:id',productsController.updateProduct)
router.put('/add/:id',productsController.addProduct)
router.put('/delete/:id',productsController.deleteProduct)
router.get('/',productsController.getAllProducts)
module.exports= router