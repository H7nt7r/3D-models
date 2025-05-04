const modelService = require('../service/ModelsService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createModel = async (req, res, next) => {
  try {
    const modelData = req.body;
    const model = await modelService.createModel(modelData);
    req.body = model;
    if (!model) {
      throw new Error('Не удалось создать модель');
    } else {
      new SuccessResponse('Модель успешно создана').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getModelById = async (req, res, next) => {
  try {
    const modelId = req.params.id;
    const model = await modelService.getModelById(modelId);
    req.body = model;
    if (!model) {
      throw new Error('Модель не найдена');
    } else {
      new SuccessResponse('Модель успешно найдена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateModel = async (req, res, next) => {
  try {
    const modelId = req.params.id;
    const modelData = req.body;
    const model = await modelService.updateModel(modelId, modelData);
    req.body = model;
    if (!model) {
      throw new Error('Не удалось обновить модель');
    } else {
      new SuccessResponse('Модель успешно обновлена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteModel = async (req, res, next) => {
  try {
    const modelId = req.params.id;
    const model = await modelService.getModelById(modelId);
    if (!model) {
      throw new Error('Модель не найдена');
    } else {
      await modelService.deleteModel(modelId);
      new SuccessResponse('Модель успешно удалена').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllModels = async (req, res, next) => {
  try {
    const model = await modelService.getAllModels();
    req.body = model;
    if (!model) {
      throw new Error('Не удалось получить модели');
    } else {
      new SuccessResponse('Модели успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const downloadModel = async (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'models', fileName);
  res.download(filePath);
}


module.exports = {
  createModel,
  getModelById,
  updateModel,
  deleteModel,
  getAllModels,
  downloadModel,
};
