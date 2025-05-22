const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectToBD");

const User_type = sequelize.define(
  "user_types",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Types",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User_type;
