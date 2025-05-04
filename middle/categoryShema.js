const Joi = require('joi');

const CategorySchema = Joi.object({
  name: Joi.string().required()
});

const validateCategory = (CategorySchema) => (req,res,next) => {
    const {error} = CategorySchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateCategory = validateCategory(CategorySchema);