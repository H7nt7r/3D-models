const favoriteRepository = require('../repository/FavoritesRepository');

const createFavorite = async (favoriteData) => {
  const favorite = await favoriteRepository.createFavorite(favoriteData);
  return favorite;
};

const getFavoriteById = async (favoriteId) => {
  const favorite = await favoriteRepository.getFavoriteById(favoriteId);
  return favorite;
};

const updateFavorite = async (favoriteId, favoriteData) => {
  const favorite = await favoriteRepository.updateFavorite(favoriteId, favoriteData);
  return favorite;
};

const deleteFavorite = async (favoriteId) => {
  await favoriteRepository.deleteFavorite(favoriteId);
};

const getAllFavorites = async () => {
  const favorite = await favoriteRepository.getAllFavorites();
  return favorite;
};

module.exports = {
  createFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
  getAllFavorites,
};
