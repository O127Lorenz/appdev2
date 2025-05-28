const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .required()
        .messages({
            'string.min': 'Username must be at least 3 characters long',
            'string.alphanum': 'Username must only contain alphanumeric characters'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long'
        })
});

const signinSchema = Joi.object({
    login: Joi.string().required(),  // can be username or email
    password: Joi.string().required()
});

module.exports = {
    signupSchema,
    signinSchema
};
