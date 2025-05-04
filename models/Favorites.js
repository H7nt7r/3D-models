const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Favorite = sequelize.define('favorites', {
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
  timestamps: false,
}
);

module.exports = Favorite;