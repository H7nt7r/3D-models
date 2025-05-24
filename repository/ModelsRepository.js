const {
  sequelize,
  Model,
  User,
  Favorite,
  Comment,
  Rating,
  Category,
  Model_Category
} = require("../models/relations");

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
      {
        model: Category,
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
  const transaction = await sequelize.transaction();
  try {
    const model = await Model.findByPk(modelId, {
      include: [Favorite, Comment, Rating],
      transaction,
    });

    if (model) {
      // Удаляем связи с категориями
      await Model_Category.destroy({
        where: { model_id: modelId },
        transaction,
      });

      // Удаляем связанные записи
      await Promise.all([
        Favorite.destroy({ where: { model_id: modelId }, transaction }),
        Comment.destroy({ where: { model_id: modelId }, transaction }),
        Rating.destroy({ where: { model_id: modelId }, transaction }),
      ]);

      // Удаляем саму модель
      await model.destroy({ transaction });
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
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
      {
        model: Category,
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
