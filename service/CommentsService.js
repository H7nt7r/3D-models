const commentRepository = require("../repository/CommentsRepository");
const { User } = require("../models/relations");
const Comment = require("../models/Comments");

const createComment = async (commentData) => {
  const comment = await commentRepository.createComment(commentData);
  return comment;
};

const getCommentById = async (commentId) => {
  const comment = await commentRepository.getCommentById(commentId);
  return comment;
};

const updateComment = async (commentId, commentData) => {
  const comment = await commentRepository.updateComment(commentId, commentData);
  return comment;
};

const deleteComment = async (commentId) => {
  await commentRepository.deleteComment(commentId);
};

const getAllComments = async () => {
  const comment = await commentRepository.getAllComments();
  return comment;
};

const getCommentsByModel = async (modelId, limit, offset) => {
  const comments = await commentRepository.getCommentsByModel(
    modelId,
    limit,
    offset
  );
  return comments;
};

const getCommentByIdWithUser = async (id) => {
  return await Comment.findOne({
    where: { id },
    include: [
      {
        model: User,
        attributes: ["id", "nickname"], // добавь нужные поля
      },
    ],
  });
};

module.exports = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentsByModel,
  getCommentByIdWithUser,
};
