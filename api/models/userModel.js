import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    role: {
        type: String,
        enum: ['admin', 'student'],
        // enum: ['admin', 'student', 'faculty'],
        default: 'student',
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
});

const User = mongoose.model('User', UserSchema);
export default User;