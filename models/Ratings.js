const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectToBD");

const Rating = sequelize.define(
  "ratings",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    model_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "models",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Rating;
