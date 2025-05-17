const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const Model_user = sequelize.define('model_user', {
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
  model_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'models',
        key: 'id',
      },
  },
},
{
	tableName: 'model_user',
  timestamps: false,
}
);

module.exports = Model_user;