const Joi = require('joi');

const ModelSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null),
  memory: Joi.string().allow(null),
  date: Joi.date().required(),
  category_id: Joi.number().integer().required(),
  preview: Joi.string().allow(null)
});

const validateModel = (ModelSchema) => (req,res,next) => {
    const {error} = ModelSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateModel = validateModel(ModelSchema);