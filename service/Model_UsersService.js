const model_userRepository = require('../repository/Model_UsersRepository');

const createModel_User = async (model_userData) => {
  const model_user = await model_userRepository.createModel_User(model_userData);
  return model_user;
};

const getModel_UserById = async (model_userId) => {
  const model_user = await model_userRepository.getModel_UserById(model_userId);
  return model_user;
};

const updateModel_User = async (model_userId, model_userData) => {
  const model_user = await model_userRepository.updateModel_User(model_userId, model_userData);
  return model_user;
};

const deleteModel_User = async (model_userId) => {
  await model_userRepository.deleteModel_User(model_userId);
};

const getAllModel_Users = async () => {
  const model_user = await model_userRepository.getAllModel_Users();
  return model_user;
};

module.exports = {
  createModel_User,
  getModel_UserById,
  updateModel_User,
  deleteModel_User,
  getAllModel_Users,
};
