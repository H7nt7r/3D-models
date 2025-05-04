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



exports.validateUser = validateUser(UserSchema);