const Joi = require('@hapi/joi');

const userValidator = (data) => {
    const schema = Joi.object(
        {
            username: Joi.string().required()
        }
    );
    return schema.validate(data);
}

const createExerciseValidator = (data) => {
    const schema = Joi.object(
        {
            userId: Joi.string().required(),
            description: Joi.string().required(),
            duration: Joi.number().required().min(0)
        }
    );
    return schema.validate(data);
}

module.exports = {
    userValidator,
    createExerciseValidator
}
