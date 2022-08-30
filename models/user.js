const mongoose = require('mongoose');
const { isEmail } = require('validator');

const schema = mongoose.Schema;
const userSchema = new schema({
    username: {
        type: String, 
        required: [true, 'Username is required'],
    },
    email: {
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        validate: [isEmail, 'Invalid Email address']
    },
    password: {
        type: String, 
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    user_id: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);

module.exports = User;