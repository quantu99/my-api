const express = require('express');
const router = express.Router();
const authController = require('../app/Controller/AuthController');
const productsHandleController = require('../app/Controller/ProductsController')
const middlewareController = require('../app/Controller/MiddlewareController');
// register
router.post('/register', authController.registerUser);
// login
router.post('/login', authController.loginUser);
// request refresh token
router.post('/refresh', authController.requestRefreshToken);
// logout
router.post('/logout', middlewareController.verifyToken, authController.logoutUser);
// update info
router.put('/:id',middlewareController.verifyToken, authController.updateInfo)
// get user cart
router.get('/cart/:id',authController.getCart)
// get user wishlist
router.get('/wish/:id',authController.getWish)
// order
router.put('/order/:id',authController.addToOrder)
// getOrder
router.get('/order/:id',authController.getOrder)
router.get('/',authController.send)
module.exports = router;
