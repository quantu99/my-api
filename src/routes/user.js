const express = require('express');
const router = express.Router();
const userController = require('../app/Controller/UserController');
const middlewareController = require('../app/Controller/MiddlewareController');
// get all users
router.get('/', middlewareController.verifyToken, userController.getAllUsers);
// delete user
router.delete('/:id', middlewareController.verifyTokenAndAdmin, userController.deleteUser);
// get user
router.get('/:id', middlewareController.verifyTokenAndAdmin, userController.getUser )

module.exports = router;