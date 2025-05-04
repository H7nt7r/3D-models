const Comment = require('../models/Comments');

const { Sequelize } = require('sequelize');


const createComment = async(commentData) => {
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

module.exports = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getAllComments,
};
