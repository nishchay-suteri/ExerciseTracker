const Joi = require('joi');

const ExerciseSchema = Joi.object(
    {
        userId: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.number().required().min(0)
    }
);

module.exports = ExerciseSchema;