const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true
    },
    college_name: {
        type: String,
        required: true
    },
    leader_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['UG', 'PG'],
        default: 'UG'
    },
    is_registered_for_event: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
