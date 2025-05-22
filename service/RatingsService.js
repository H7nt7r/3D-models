const ratingRepository = require("../repository/RatingsRepository");

const createRating = async (ratingData) => {
  const rating = await ratingRepository.createRating(ratingData);
  return rating;
};

const getRatingById = async (ratingId) => {
  const rating = await ratingRepository.getRatingById(ratingId);
  return rating;
};

const updateRating = async (ratingId, ratingData) => {
  const rating = await ratingRepository.updateRating(ratingId, ratingData);
  return rating;
};

const deleteRating = async (ratingId) => {
  await ratingRepository.deleteRating(ratingId);
};

const getAllRatings = async () => {
  const rating = await ratingRepository.getAllRatings();
  return rating;
};

module.exports = {
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  getAllRatings,
};
