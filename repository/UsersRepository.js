// const User = require('../models/Users');
const User_type = require('../models/User_types');
const Type = require('../models/Types');
const { sequelize, Model, User, Model_user } = require('../models/relations');

const createUser = async(userData) => {
  const user = await User.create(userData);
  
  const defaultRole = await Type.findOne({ where: { id: 3 } });
  if (!defaultRole) {
    throw new Error('Тип с id=3 не найден');
  }

  const userRole = await User_type.create({
    user_id: user.id,
    type_id: defaultRole.id
  });

  if (!userRole) {
    throw new Error('Не удалось создать запись о роли пользователя');
  }

  return user;
};

const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const updateUser = async (userId, userData) => {
  const user = await User.findByPk(userId);
  await user.update(userData);
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  await user.destroy();
};

const getAllUsers = async () => {
  const user = await User.findAll();
  return user;
};

const getUserProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'nickname', 'login', 'email'],
    include: [
      {
        model: Model,
        through: {
          model: Model_user,
          attributes: [],
        },
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT AVG(r.rating)
                FROM ratings AS r
                WHERE r.model_id = "models"."id"
              )`),
              "averageRating",
            ],
          ],
        },
        include: [
          {
            model: User,
            through: { attributes: [] },
            attributes: ["nickname"],
          },
        ],
      },
    ],
  });

  return user;
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
	getUserProfile,
};
