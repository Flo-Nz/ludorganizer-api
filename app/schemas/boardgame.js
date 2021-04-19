const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    min_players: Joi.number().integer().required(),
    max_players: Joi.number().integer().required(),
    min_age: Joi.number().integer().required(),
    duration: Joi.string().required(),
    picture_url: Joi.string(),
    author_id: Joi.number().integer(),
    editor_id: Joi.number().integer(),
    difficulty_id: Joi.number().integer()
});

module.exports = schema;