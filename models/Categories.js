const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

const Categories = sequelize.define('categories', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  timestamps: false,
}
);

module.exports = Categories;