const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('3D-models', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const Model = sequelize.define('models', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  memory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'categories',
        key: 'id',
      },
  },
  preview: {
    type: DataTypes.STRING,
    allowNull: true,
  },
	file_name: {
		type: DataTypes.STRING,
		allowNull: true,
	},
},
{
  timestamps: false,
}
);

module.exports = Model;