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
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string().required()
}).or('email', 'username')  // Require either email or username

module.exports = {
    signupSchema,
    signinSchema
};
