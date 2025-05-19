const Joi = require('joi');

const CommentSchema = Joi.object({
    comment: Joi.string().required(),
    date: Joi.date().optional(),
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