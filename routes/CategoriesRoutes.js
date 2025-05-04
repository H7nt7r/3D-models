const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoryController');
const authenicate = require('../error/authenicate');
const { validateCategory } = require('../middle/categoryShema');

router.post('/', validateCategory, categoriesController.createCategory);
router.get('/:id', categoriesController.getCategoryById);
router.put('/:id', validateCategory, categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);
router.get('/', categoriesController.getAllCategories);

module.exports = router;
