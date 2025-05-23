const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");
const { authenticate } = require("../error/authenicate"); // Используем деструктуризацию
const { validateUser, validateUserUpdate } = require("../middle/userShema");

//router.get('/info', usersController.getUserFromToken);
router.get("/", usersController.getAllUsers);
router.post("/", validateUser, usersController.createUser);
router.get("/profile", authenticate, usersController.getUserProfile);
router.put(
  "/profile",
  authenticate,
  validateUserUpdate,
  usersController.updateOwnProfile
);
router.get("/:id", usersController.getUserById);
router.put("/:id", validateUser, usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
