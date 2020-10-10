const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 1,
            maxlength: 255,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User',UserSchema);