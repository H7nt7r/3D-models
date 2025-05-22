const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentController");
const authenicate = require("../error/authenicate");
const { validateComment } = require("../middle/commentShema");

router.post("/", validateComment, commentsController.createComment);
router.get("/model/:modelId", commentsController.getCommentsByModel);
router.get("/:id", commentsController.getCommentById);
router.put("/:id", validateComment, commentsController.updateComment);
router.delete("/:id", commentsController.deleteComment);
router.get("/", commentsController.getAllComments);

module.exports = router;
