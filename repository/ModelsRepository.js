const { sequelize, Model, User } = require('../models/relations');

const { Sequelize } = require('sequelize');


const createModel = async(modelData) => {
	const model = await Model.create(modelData);
	return model;
};

const getModelById = async (modelId) => {
  const model = await Model.findByPk(modelId, {
    include: [
      {
        model: User,
        attributes: ['nickname'],
        through: { attributes: [] }
      }
    ]
  });
  return model;
};

const updateModel = async (modelId, modelData) => {
  const model = await Model.findByPk(modelId);
  await model.update(modelData);
  return model;
};

const deleteModel = async (modelId) => {
  const model = await Model.findByPk(modelId);
  await model.destroy();
};

const getAllModels = async () => {
  const models = await Model.findAll({
    include: [
      {
        model: User,
        attributes: ['nickname'],
        through: { attributes: [] }
      }
    ],
		attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT AVG(r.rating)
            FROM ratings AS r
            WHERE r.model_id = "models"."id"
          )`),
          'averageRating'
        ]
      ]
    }
  });
  return models;
};

module.exports = {
  createModel,
  getModelById,
  updateModel,
  deleteModel,
  getAllModels,
};
