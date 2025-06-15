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
        }),
    yearPublished: Joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear())
        .messages({
            'number.base': 'Year must be a number',
            'number.integer': 'Year must be an integer',
            'number.min': 'Year must be 1000 or later',
            'number.max': 'Year cannot be in the future'
        })
});

module.exports = {
    bookSchema
};
