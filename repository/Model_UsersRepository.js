const Model_User = require("../models/Models_Users");

const { Sequelize } = require("sequelize");

const createModel_User = async (model_userData) => {
  const model_user = await Model_User.create(model_userData);
  return model_user;
};

const getModel_UserById = async (model_userId) => {
  const model_user = await Model_User.findByPk(model_userId);
  return model_user;
};

const updateModel_User = async (model_userId, model_userData) => {
  const model_user = await Model_User.findByPk(model_userId);
  await model_user.update(model_userData);
  return model_user;
};

const deleteModel_User = async (model_userId) => {
  const model_user = await Model_User.findByPk(model_userId);
  await model_user.destroy();
};

const getAllModel_Users = async () => {
  const model_user = await Model_User.findAll();
  return model_user;
};

module.exports = {
  createModel_User,
  getModel_UserById,
  updateModel_User,
  deleteModel_User,
  getAllModel_Users,
};
