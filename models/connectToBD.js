const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = {
	sequelize,
}