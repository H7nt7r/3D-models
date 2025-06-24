const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");
const { authenticate } = require("../error/authenicate");
const { validateUser, validateUserUpdate } = require("../middle/userShema");

router.get("/", authenticate, usersController.getAllUsers);
router.post("/", validateUser, usersController.createUser);
router.get("/profile", authenticate, usersController.getUserProfile);
router.put(
  "/profile",
  authenticate,
  validateUserUpdate,
  usersController.updateOwnProfile
);
router.get("/:id",authenticate, usersController.getUserById);
router.put("/:id",authenticate, validateUser, usersController.updateUser);
router.delete("/:id", authenticate, usersController.deleteUser);

module.exports = router;
