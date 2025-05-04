const Joi = require('joi');

const FavoriteSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    model_id: Joi.number().integer().required()
});

const validateFavorite = (FavoriteSchema) => (req,res,next) => {
    const {error} = FavoriteSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateFavorite = validateFavorite(FavoriteSchema);