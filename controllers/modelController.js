const modelService = require("../service/ModelsService");
const { ErrorResponse, SuccessResponse } = require("../error/error_back");
const path = require("path");
const fs = require("fs");

const createModel = async (req, res, next) => {
  try {
    const modelData = req.body;
    const model = await modelService.createModel(modelData);
    req.body = model;
    if (!model) {
      throw new Error("Не удалось создать модель");
    } else {
      new SuccessResponse("Модель успешно создана").send(res, req.body);
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
      throw new Error("Модель не найдена");
    } else {
      new SuccessResponse("Модель успешно найдена").send(res, req.body);
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
      throw new Error("Не удалось обновить модель");
    } else {
      new SuccessResponse("Модель успешно обновлена").send(res, req.body);
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
      throw new Error("Модель не найдена");
    } else {
      await modelService.deleteModel(modelId);
      new SuccessResponse("Модель успешно удалена").send(res);
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
      throw new Error("Не удалось получить модели");
    } else {
      new SuccessResponse("Модели успешно получены").send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const downloadModel = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "..", "assets", "models", fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Файл не найден" });
    }
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Ошибка при скачивании файла:", err);
        res.status(500).send("Ошибка при скачивании файла");
      }
    });
  });
};

const getOtherModelsByAuthor = async (req, res, next) => {
  try {
    const { userId, modelId } = req.query;
    const models = await modelService.getOtherModelsByAuthor(userId, modelId);
    new SuccessResponse("Модели автора успешно получены").send(res, models);
  } catch (error) {
    next(error);
  }
};

const getOtherModels = async (req, res, next) => {
  try {
    const { modelId } = req.query;
    const models = await modelService.getOtherModels(modelId);
    new SuccessResponse("Другие модели успешно получены").send(res, models);
  } catch (error) {
    next(error);
  }
};

const getTopRatedModels = async (req, res, next) => {
  try {
    const models = await modelService.getTopRatedModels();
    new SuccessResponse("Топ модели успешно получены").send(res, models);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createModel,
  getModelById,
  updateModel,
  deleteModel,
  getAllModels,
  downloadModel,
  getOtherModels,
  getOtherModelsByAuthor,
	getTopRatedModels,
};
