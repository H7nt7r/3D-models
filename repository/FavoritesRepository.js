const { sequelize, Model, Favorite, User } = require("../models/relations");

const { Sequelize } = require("sequelize");

const createFavorite = async (favoriteData) => {
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

const getFavoritesByUserId = async (userId) => {
  const favorites = await Favorite.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Model,
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT AVG(r.rating)
                FROM ratings AS r
                WHERE r.model_id = "model"."id"
              )`),
              "averageRating",
            ],
          ],
        },
        include: [
          {
            model: User,
            through: { attributes: [] },
            attributes: ["nickname"],
          },
        ],
      },
    ],
  });

  return favorites;
};

module.exports = {
  createFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
  getAllFavorites,
  getFavoritesByUserId,
};
