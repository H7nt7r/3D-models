const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const User_type=require('./User_types')

const Type = sequelize.define('types', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  timestamps: false,
}
);




module.exports = Type;