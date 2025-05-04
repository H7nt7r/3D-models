const commentService = require('../service/CommentsService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createComment = async (req, res, next) => {
  try {
    const commentData = req.body;
    const comment = await commentService.createComment(commentData);
    req.body = comment;
    if (!comment) {
      throw new Error('Не удалось создать комментарий');
    } else {
      new SuccessResponse('Комментарий успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await commentService.getCommentById(commentId);
    req.body = comment;
    if (!comment) {
      throw new Error('Комментарий не найден');
    } else {
      new SuccessResponse('Комментарий успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const commentData = req.body;
    const comment = await commentService.updateComment(commentId, commentData);
    req.body = comment;
    if (!comment) {
      throw new Error('Не удалось обновить комментарий');
    } else {
      new SuccessResponse('Комментарий успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await commentService.getCommentById(commentId);
    if (!comment) {
      throw new Error('Комментарий не найден');
    } else {
      await commentService.deleteComment(commentId);
      new SuccessResponse('Комментарий успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const comment = await commentService.getAllComments();
    req.body = comment;
    if (!comment) {
      throw new Error('Не удалось получить комментарии');
    } else {
      new SuccessResponse('Комментарии успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getAllComments,
};
