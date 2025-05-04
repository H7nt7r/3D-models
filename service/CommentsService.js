const commentRepository = require('../repository/CommentsRepository');

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

module.exports = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getAllComments,
};
