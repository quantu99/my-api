const express = require('express');
const router = express.Router();
const orderHistoryController = require('../app/Controller/OrderHistoryController');
router.get('/:id',orderHistoryController.getOrderHistoryDetail)
router.get('/',orderHistoryController.getAllOrderHistory)
module.exports = router
