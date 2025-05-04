const favoriteService = require('../service/FavoritesService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createFavorite = async (req, res, next) => {
  try {
    const favoriteData = req.body;
    const favorite = await favoriteService.createFavorite(favoriteData);
    req.body = favorite;
    if (!favorite) {
      throw new Error('Не удалось создать избранное');
    } else {
      new SuccessResponse('Избранное успешно создано').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getFavoriteById = async (req, res, next) => {
  try {
    const favoriteId = req.params.id;
    const favorite = await favoriteService.getFavoriteById(favoriteId);
    req.body = favorite;
    if (!favorite) {
      throw new Error('Избранное не найдено');
    } else {
      new SuccessResponse('Избранное успешно найдено').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const favoriteId = req.params.id;
    const favoriteData = req.body;
    const favorite = await favoriteService.updateFavorite(favoriteId, favoriteData);
    req.body = favorite;
    if (!favorite) {
      throw new Error('Не удалось обновить избранное');
    } else {
      new SuccessResponse('Избранное успешно обновлено').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const favoriteId = req.params.id;
    const favorite = await favoriteService.getFavoriteById(favoriteId);
    if (!favorite) {
      throw new Error('Избранное не найдено');
    } else {
      await favoriteService.deleteFavorite(favoriteId);
      new SuccessResponse('Избранное успешно удалено').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllFavorites = async (req, res, next) => {
  try {
    const favorite = await favoriteService.getAllFavorites();
    req.body = favorite;
    if (!favorite) {
      throw new Error('Не удалось получить избранные');
    } else {
      new SuccessResponse('Избранные успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
  getAllFavorites,
};
