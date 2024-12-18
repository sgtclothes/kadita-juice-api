const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 30 characters'
    }),
    
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long'
    })
});

module.exports = {
  loginSchema
};