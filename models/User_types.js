const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const User_type = sequelize.define('user_types', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'users',
        key: 'id',
      },
  },
  type_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'Types',
        key: 'id',
      },
  }
},
{
  timestamps: false,
}
);

module.exports = User_type;