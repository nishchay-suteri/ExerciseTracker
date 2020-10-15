const Joi = require('joi');

const userValidator = (data) => {
    const schema = Joi.object(
        {
            username: Joi.string().required().min(5).error(errors=>{
                errors.forEach(err=>{
                    if(err.code == "string.empty")
                    {
                        err.message = "Username is required";
                    }
                    else if(err.code == "string.min")
                    {
                        err.message = "Minimum length of username is 5"
                    }
                });
                return errors;
            })
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
