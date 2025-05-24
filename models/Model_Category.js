const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectToBD");

const Model_Category = sequelize.define(
  "model_categories",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    model_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "models",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Model_Category;