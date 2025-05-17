const Joi = require('joi');

const UserSchema = Joi.object({
  nickname: Joi.string().required(),
  email: Joi.string().email().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

const validateUser = (UserSchema) => (req,res,next) => {
    const {error} = UserSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}

const validateUserUpdate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    nickname: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = {
  validateUser,
  validateUserUpdate
};