const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String
});

const RegistrationSchema = new mongoose.Schema({
    category: {
        type: String, // 'UG' or 'PG'
        required: true
    },
    college_name: {
        type: String,
        required: true
    },
    team_name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    leader: {
        name: String,
        contact: String,
        email: String
    },
    members: [MemberSchema],
    payment: {
        transactionId: String,
        screenshotPath: String, // Path to uploaded file
        verified: {
            type: Boolean,
            default: false
        }
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
        default: 'Pending'
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
