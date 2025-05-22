const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectToBD");

const Categories = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
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
