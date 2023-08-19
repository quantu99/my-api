const express = require('express');
const router = express.Router();
const orderController = require('../app/Controller/OrderController')
router.post('/add',orderController.addNewOrder);
router.get('/:id',orderController.getOrderDetail);
router.get('/',orderController.getAllOrder);
module.exports = router;