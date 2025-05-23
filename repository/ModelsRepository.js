const { sequelize, Model, User, Favorite, Comment, Rating } = require("../models/relations"); // Добавляем Favorite, Comment, Rating

const { Sequelize } = require("sequelize");

const createModel = async (modelData) => {
  const model = await Model.create(modelData);
  return model;
};

const getModelById = async (modelId) => {
  const model = await Model.findByPk(modelId, {
    include: [
      {
        model: User,
        attributes: ["id", "nickname"],
        through: { attributes: [] },
      },
    ],
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT AVG(r.rating)
            FROM ratings AS r
            WHERE r.model_id = "models"."id"
          )`),
          "averageRating",
        ],
      ],
    },
  });
  return model;
};

const updateModel = async (modelId, modelData) => {
  const model = await Model.findByPk(modelId);
  await model.update(modelData);
  return model;
};

const deleteModel = async (modelId) => {
  const model = await Model.findByPk(modelId, {
    include: [Favorite, Comment, Rating] // Включаем связанные модели
  });
  if (model) {
    // Удаляем связанные избранные записи
    await model.getFavorites().then(favorites => {
      return Promise.all(favorites.map(favorite => favorite.destroy()));
    });

    // Удаляем связанные комментарии
    await model.getComments().then(comments => {
      return Promise.all(comments.map(comment => comment.destroy()));
    });

    // Удаляем связанные рейтинги
    await model.getRatings().then(ratings => {
      return Promise.all(ratings.map(rating => rating.destroy()));
    });

    // Удаляем саму модель
    await model.destroy();
  }
};

const getAllModels = async () => {
  const models = await Model.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "nickname"],
        through: { attributes: [] },
      },
    ],
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT AVG(r.rating)
            FROM ratings AS r
            WHERE r.model_id = "models"."id"
          )`),
          "averageRating",
        ],
      ],
    },
  });
  return models;
};

const getOtherModelsByAuthor = async (userId, excludeModelId) => {
  const models = await Model.findAll({
    include: [
      {
        model: User,
        where: { id: userId },
        attributes: ["id", "nickname"],
        through: { attributes: [] },
      },
    ],
    where: {
      id: { [Sequelize.Op.ne]: excludeModelId },
    },
    limit: 4,
    attributes: {
      include: [
        [
          sequelize.literal(`(
          SELECT AVG(r.rating)
          FROM ratings AS r
          WHERE r.model_id = "models"."id"
        )`),
          "averageRating",
        ],
      ],
    },
  });

  return models;
};

const getOtherModels = async (excludeModelId) => {
  const models = await Model.findAll({
    where: {
      id: { [Sequelize.Op.ne]: excludeModelId },
    },
    limit: 4,
    include: [
      {
        model: User,
        attributes: ["id", "nickname"],
        through: { attributes: [] },
      },
    ],
    attributes: {
      include: [
        [
          sequelize.literal(`(
          SELECT AVG(r.rating)
          FROM ratings AS r
          WHERE r.model_id = "models"."id"
        )`),
          "averageRating",
        ],
      ],
    },
  });

  return models;
};

const getTopRatedModels = async (limit = 6) => {
  const averageRatingLiteral = `(SELECT AVG(r.rating) FROM ratings AS r WHERE r.model_id = models.id)`;

  const models = await Model.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "nickname"],
        through: { attributes: [] },
      },
    ],
    attributes: {
      include: [[sequelize.literal(averageRatingLiteral), "averageRating"]],
    },
    order: [[sequelize.literal(`${averageRatingLiteral} DESC NULLS LAST`)]],
    limit,
  });

  return models;
};

module.exports = {
  createModel,
  getModelById,
  updateModel,
  deleteModel,
  getAllModels,
  getOtherModels,
  getOtherModelsByAuthor,
  getTopRatedModels,
};
