const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectToBD");

const User_type = require("./User_types");

const Type = sequelize.define(
  "types",
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

module.exports = Type;
