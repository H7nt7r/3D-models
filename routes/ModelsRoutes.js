const express = require('express');
const router = express.Router();
const modelsController = require('../controllers/modelController');
const authenicate = require('../error/authenicate');
const { validateModel } = require('../middle/modelShema');

router.post('/', validateModel, modelsController.createModel);
router.get('/:id', modelsController.getModelById);
router.put('/:id', validateModel, modelsController.updateModel);
router.delete('/:id', modelsController.deleteModel);
router.get('/', modelsController.getAllModels);

module.exports = router;
