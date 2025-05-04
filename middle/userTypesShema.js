const Joi = require('joi');

const UserTypeSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  type_id: Joi.number().integer().required()
});

const validateUserType = (UserTypeSchema) => (req,res,next) => {
    const {error} = UserTypeSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateUserType = validateUserType(UserTypeSchema);
