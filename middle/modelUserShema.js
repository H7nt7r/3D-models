const Joi = require('joi');

const ModelUserSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    model_id: Joi.number().integer().required()
});

const validateModelUser = (ModelUserSchema) => (req,res,next) => {
    const {error} = ModelUserSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateModelUser = validateModelUser(ModelUserSchema);