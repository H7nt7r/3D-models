const Joi = require('joi');

const TypeSchema = Joi.object({
  name: Joi.string().required()
});

const validateType = (TypeSchema) => (req,res,next) => {
    const {error} = TypeSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateType = validateType(TypeSchema);
