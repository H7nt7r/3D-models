const Favorite = require('../models/Favorites');

const { Sequelize } = require('sequelize');


const createFavorite = async(favoriteData) => {
	const favorite = await Favorite.create(favoriteData);
	return favorite;
};

const getFavoriteById = async (favoriteId) => {
  const favorite = await Favorite.findByPk(favoriteId);
  return favorite;
};

const updateFavorite = async (favoriteId, favoriteData) => {
  const favorite = await Favorite.findByPk(favoriteId);
  await favorite.update(favoriteData);
  return favorite;
};

const deleteFavorite = async (favoriteId) => {
  const favorite = await Favorite.findByPk(favoriteId);
  await favorite.destroy();
};

const getAllFavorites = async () => {
  const favorite = await Favorite.findAll();
  return favorite;
};

module.exports = {
  createFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
  getAllFavorites,
};
