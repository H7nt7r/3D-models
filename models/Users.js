const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const Type = require ('./Types');
const User_type=require('./User_types');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  timestamps: false,
}
);

User.afterCreate(async (user, options) => {
  try {
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

    console.log(`Запись о роли пользователя успешно создана для пользователя с id=${user.id}`);
  } catch (error) {
    console.error('Ошибка при создании записи о роли пользователя:', error.message);
  }
});



module.exports = User;