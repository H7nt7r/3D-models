const Rating = require('../models/Ratings');

const createRating = async(ratingData) => {
	const rating = await Rating.create(ratingData);
	return rating;
};

const getRatingById = async (ratingId) => {
  const rating = await Rating.findByPk(ratingId);
  return rating;
};

const updateRating = async (ratingId, ratingData) => {
  const rating = await Rating.findByPk(ratingId);
  await rating.update(ratingData);
  return rating;
};

const deleteRating = async (ratingId) => {
  const rating = await Rating.findByPk(ratingId);
  await rating.destroy();
};

const getAllRatings = async () => {
  const rating = await Rating.findAll();
  return rating;
};

module.exports = {
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  getAllRatings,
};
