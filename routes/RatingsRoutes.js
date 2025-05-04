const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratingController');
const authenicate = require('../error/authenicate');
const { validateRating } = require('../middle/ratingShema');

router.post('/', validateRating, ratingsController.createRating);
router.get('/:id', ratingsController.getRatingById);
router.put('/:id', validateRating, ratingsController.updateRating);
router.delete('/:id', ratingsController.deleteRating);
router.get('/', ratingsController.getAllRatings);

module.exports = router;
