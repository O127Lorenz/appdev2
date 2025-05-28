const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Title cannot be empty',
            'any.required': 'Title is required'
        }),
    author: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Author cannot be empty',
            'any.required': 'Author is required'
        })
});

module.exports = {
    bookSchema
};
