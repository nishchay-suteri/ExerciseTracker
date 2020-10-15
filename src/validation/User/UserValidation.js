const UserSchema = require('./UserSchema');

const createUserValidator = (data)=>{
    return UserSchema.validate(data);
}

module.exports = {
    createUserValidator
};