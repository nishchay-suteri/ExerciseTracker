const mongoose = require('mongoose');

const ExcerciseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.ObjectId,
            required: true
        },
        description: {
            type: String,
            minlength: 1,
            required: true
        },
        duration: {
            type: String,
            minlength: 1,
            maxlength: 255,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Excercise',ExcerciseSchema);