const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoriteController');
const authenicate = require('../error/authenicate');
const { validateFavorite } = require('../middle/favoriteShema');

router.post('/', validateFavorite, favoritesController.createFavorite);
router.get('/:id', favoritesController.getFavoriteById);
router.put('/:id', validateFavorite, favoritesController.updateFavorite);
router.delete('/:id', favoritesController.deleteFavorite);
router.get('/', favoritesController.getAllFavorites);
router.get('/user/:userId', favoritesController.getFavoritesByUserId);

module.exports = router;
