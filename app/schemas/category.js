const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required()
});

module.exports = schema;