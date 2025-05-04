const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const authenicate = require('../error/authenicate');
const { validateUser } = require('../middle/userShema');

//router.get('/info', usersController.getUserFromToken);
router.post('/', validateUser, usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', validateUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.get('/', usersController.getAllUsers);

module.exports = router;
