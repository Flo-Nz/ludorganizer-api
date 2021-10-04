const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(20).required()
});

module.exports = schema;