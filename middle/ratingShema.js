const Joi = require('joi');

const RatingSchema = Joi.object({
    rating: Joi.number().required(),
    date: Joi.date().required(),
    user_id: Joi.number().integer().required(),
    model_id: Joi.number().integer().required()
});

const validateRating = (RatingSchema) => (req,res,next) => {
    const {error} = RatingSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateRating = validateRating(RatingSchema);