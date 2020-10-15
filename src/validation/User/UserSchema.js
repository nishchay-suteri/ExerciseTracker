const Joi = require('joi');
const UserSchema = Joi.object(
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

module.exports = UserSchema;