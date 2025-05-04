const model_userService = require('../service/Model_UsersService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createModel_User = async (req, res, next) => {
  try {
    const model_userData = req.body;
    const model_user = await model_userService.createModel_User(model_userData);
    req.body = model_user;
    if (!model_user) {
      throw new Error('Не удалось создать модель пользователя');
    } else {
      new SuccessResponse('Модель пользователя успешно создана').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getModel_UserById = async (req, res, next) => {
  try {
    const model_userId = req.params.id;
    const model_user = await model_userService.getModel_UserById(model_userId);
    req.body = model_user;
    if (!model_user) {
      throw new Error('Модель пользователя не найдена');
    } else {
      new SuccessResponse('Модель пользователя успешно найдена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateModel_User = async (req, res, next) => {
  try {
    const model_userId = req.params.id;
    const model_userData = req.body;
    const model_user = await model_userService.updateModel_User(model_userId, model_userData);
    req.body = model_user;
    if (!model_user) {
      throw new Error('Не удалось обновить модель пользователя');
    } else {
      new SuccessResponse('Модель пользователя успешно обновлена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteModel_User = async (req, res, next) => {
  try {
    const model_userId = req.params.id;
    const model_user = await model_userService.getModel_UserById(model_userId);
    if (!model_user) {
      throw new Error('Модель пользователя не найдена');
    } else {
      await model_userService.deleteModel_User(model_userId);
      new SuccessResponse('Модель пользователя успешно удалена').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllModel_Users = async (req, res, next) => {
  try {
    const model_user = await model_userService.getAllModel_Users();
    req.body = model_user;
    if (!model_user) {
      throw new Error('Не удалось получить модели пользователей');
    } else {
      new SuccessResponse('Модели пользователей успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createModel_User,
  getModel_UserById,
  updateModel_User,
  deleteModel_User,
  getAllModel_Users,
};
