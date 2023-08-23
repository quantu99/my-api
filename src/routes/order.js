const express = require('express');
const router = express.Router();
const orderController = require('../app/Controller/OrderController')
router.post('/add',orderController.addNewOrder);
router.get('/:id',orderController.getOrderDetail);
router.put('/verify/:id',orderController.verifyOrder);
router.put('/process/:id',orderController.editOrderProcess);
router.delete('/:id',orderController.deleteOrder);
router.put('/getitem/:id',orderController.verifyGetItem);
router.put('/order-to-history/:id',orderController.pushOrderToHistory);
router.get('/',orderController.getAllOrder);
module.exports = router;