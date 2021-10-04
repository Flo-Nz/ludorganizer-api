const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(20).required().label('Password'),
    passwordConfirm: Joi.any().equal(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Passwords don\'t match' }),
    email: Joi.string().pattern(/^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, { name: 'email'}).required()
});

module.exports = schema;