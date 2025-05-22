const User = require('./Users');
const Model = require('./Models');
const Favorite = require('./Favorites');
const Model_user = require('./Models_users');
const Type = require('./Types');
const User_type = require('./User_types');
const Comment = require('./Comments');
const { sequelize } = require("./connectToBD");

Model.belongsToMany(User, {
  through: Model_user,
  foreignKey: 'model_id',
  otherKey: 'user_id'
});

User.belongsToMany(Model, {
  through: Model_user,
  foreignKey: 'user_id',
  otherKey: 'model_id'
});

Favorite.belongsTo(Model, { foreignKey: 'model_id' });
Model.hasMany(Favorite, { foreignKey: 'model_id' });

Type.hasMany(User_type, { foreignKey: "type_id"});
User_type.belongsTo(Type, { foreignKey: 'type_id' });

User.hasMany(User_type, { foreignKey: "user_id"});
User_type.belongsTo(User, { foreignKey: 'user_id' });

Comment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });

module.exports = {
	sequelize,
  User,
  Model,
  Model_user,
	Favorite,
};
