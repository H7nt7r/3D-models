const express = require("express");
const User = require("../models/Users");
const userService = require("../service/UsersService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  jwt.verify(token, "123", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Невалидный токен" });
    }
    req.user = user;
    next();
  });
};

router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.put("/me", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const updatedUser = await userService.updateUser(userId, { name, email });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({
      success: false,
      message: "Неверный логин или пароль",
      status: 400,
    });
  }

  try {
    const userWithLogin = await User.findOne({ where: { login } });

    if (!userWithLogin) {
      return res.status(400).json({
        success: false,
        message: "Неверный логин!",
        status: 400,
      });
    }

    const isMatch = await bcrypt.compare(password, userWithLogin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Неверный пароль!",
        status: 400,
      });
    }

    const jwtToken = jwt.sign(
      { id: userWithLogin.id, login: userWithLogin.login },
      "123",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Добро пожаловать!",
      token: jwtToken,
      status: 200,
    });
  } catch (err) {
    console.error("Error: ", err);
    res
      .status(500)
      .json({ success: false, message: "Ошибка сервера", status: 500 });
  }
});

router.post("/register", async (req, res) => {
  const { nickname, email, login, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { login } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Логин уже существует" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      nickname,
      email,
      login,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({
      success: true,
      message: "Пользователь зарегистрирован",
      user: newUser,
    });
  } catch (error) {
    console.error("Ошибка регистрации пользователя:", error);
    res.status(400).json({
      success: false,
      message: "Ошибка регистрации пользователя",
      error: error.message,
    });
  }
});

module.exports = router;
