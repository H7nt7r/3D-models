const ratingService = require('../service/RatingsService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createRating = async (req, res, next) => {
  try {
    const ratingData = req.body;
    const rating = await ratingService.createRating(ratingData);
    req.body = rating;
    if (!rating) {
      throw new Error('Не удалось создать рейтинг');
    } else {
      new SuccessResponse('Рейтинг успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getRatingById = async (req, res, next) => {
  try {
    const ratingId = req.params.id;
    const rating = await ratingService.getRatingById(ratingId);
    req.body = rating;
    if (!rating) {
      throw new Error('Рейтинг не найден');
    } else {
      new SuccessResponse('Рейтинг успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateRating = async (req, res, next) => {
  try {
    const ratingId = req.params.id;
    const ratingData = req.body;
    const rating = await ratingService.updateRating(ratingId, ratingData);
    req.body = rating;
    if (!rating) {
      throw new Error('Не удалось обновить рейтинг');
    } else {
      new SuccessResponse('Рейтинг успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteRating = async (req, res, next) => {
  try {
    const ratingId = req.params.id;
    const rating = await ratingService.getRatingById(ratingId);
    if (!rating) {
      throw new Error('Рейтинг не найден');
    } else {
      await ratingService.deleteRating(ratingId);
      new SuccessResponse('Рейтинг успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllRatings = async (req, res, next) => {
  try {
    const rating = await ratingService.getAllRatings();
    req.body = rating;
    if (!rating) {
      throw new Error('Не удалось получить рейтинги');
    } else {
      new SuccessResponse('Рейтинги успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  getAllRatings,
};
