const express = require('express');
const router = express.Router();
const model_usersController = require('../controllers/model_usersController');

const {validateModelUser} = require('../middle/modelUserShema')

router.get('/:id', model_usersController.getModel_UserById);
router.post('/',validateModelUser ,model_usersController.createModel_User);
router.get('/', model_usersController.getAllModel_Users);
router.delete('/:id', model_usersController.deleteModel_User);
router.put('/:id',validateModelUser ,model_usersController.updateModel_User)

module.exports = router;