const modelRepository = require("../repository/ModelsRepository");

const createModel = async (modelData) => {
  const model = await modelRepository.createModel(modelData);
  return model;
};

const getModelById = async (modelId) => {
  const model = await modelRepository.getModelById(modelId);
  return model;
};

const updateModel = async (modelId, modelData) => {
  const model = await modelRepository.updateModel(modelId, modelData);
  return model;
};

const deleteModel = async (modelId) => {
  await modelRepository.deleteModel(modelId);
};

const getAllModels = async () => {
  const model = await modelRepository.getAllModels();
  return model;
};

const getOtherModelsByAuthor = async (userId, excludeModelId) => {
  return await modelRepository.getOtherModelsByAuthor(userId, excludeModelId);
};

const getOtherModels = async (excludeModelId) => {
  return await modelRepository.getOtherModels(excludeModelId);
};

module.exports = {
  createModel,
  getModelById,
  updateModel,
  deleteModel,
  getAllModels,
  getOtherModels,
  getOtherModelsByAuthor,
};
