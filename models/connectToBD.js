const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-mod', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = {
	sequelize,
}