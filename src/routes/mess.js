const express = require('express');
const router = express.Router();
const messController = require('../app/Controller/MessController')
router.put('/add-new-message',messController.addNewMess)
router.get('/all-messages',messController.getAllMess)
router.get('/:id',messController.getMessDetail)
module.exports = router