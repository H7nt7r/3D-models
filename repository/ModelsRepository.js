const Model = require('../models/Models');

const { Sequelize } = require('sequelize');


const createModel = async(modelData) => {
	const model = await Model.create(modelData);
	return model;
};

const getModelById = async (modelId) => {
  const model = await Model.findByPk(modelId);
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
  const model = await Model.findAll();
  return model;
};

module.exports = {
  createModel,
  getModelById,
  updateModel,
  deleteModel,
  getAllModels,
};
