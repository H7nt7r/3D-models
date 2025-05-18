const Comment = require("../models/Comments");
const { User } = require("../models/relations");

const { Sequelize } = require("sequelize");

const createComment = async (commentData) => {
  const comment = await Comment.create(commentData);
  return comment;
};

const getCommentById = async (commentId) => {
  const comment = await Comment.findByPk(commentId);
  return comment;
};

const updateComment = async (commentId, commentData) => {
  const comment = await Comment.findByPk(commentId);
  await comment.update(commentData);
  return comment;
};

const deleteComment = async (commentId) => {
  const comment = await Comment.findByPk(commentId);
  await comment.destroy();
};

const getAllComments = async () => {
  const comment = await Comment.findAll();
  return comment;
};

const getCommentsByModel = async (modelId, limit, offset) => {
  const comments = await Comment.findAll({
    where: { model_id: modelId },
    include: [
      {
        model: User,
        attributes: ["nickname"],
      },
    ],
    limit,
    offset,
    order: [["date", "DESC"]],
  });
  return comments;
};

module.exports = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentsByModel,
};
