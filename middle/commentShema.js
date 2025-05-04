const Joi = require('joi');

const CommentSchema = Joi.object({
    author: Joi.string().required(),
    comment: Joi.string().required(),
    date: Joi.date().required(),
    user_id: Joi.number().integer().required(),
    model_id: Joi.number().integer().required()
});

const validateComment = (CommentSchema) => (req,res,next) => {
    const {error} = CommentSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateComment = validateComment(CommentSchema);