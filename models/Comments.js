const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectToBD");

const Comment = sequelize.define(
  "comments",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
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

module.exports = Comment;
