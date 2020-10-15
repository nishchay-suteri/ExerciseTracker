const ExerciseSchema = require('./ExerciseSchema');

const createExerciseValidator = (data)=>{
    return ExerciseSchema.validate(data);
}

module.exports = {
    createExerciseValidator
};