const User = require('../models/user');
const bcrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// signup
const Signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            return res.status(400).json({
                message: 'Username already taken'
            });
        }

        if(password.length < 8) { 
            return res.status(400).json({
                message: 'Password must be at least 8 characters'
            });
        }

        const salt = await bcrpt.genSalt(10);
        const hashedPassword = await bcrpt.hash(password, salt);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            user_id: uuidv4()
        });

        const savedUser = await newUser.save();
        const token = jwt.sign({ user_id: savedUser.user_id }, process.env.JWT_SECRET);
        res.status(201).json({savedUser, token});
    } catch (error) {
        res.status(500).json(error.errors);
    }
}

// login
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Email does not exist'
            });
        }

        if(password.length < 8) { 
            return res.status(400).json({
                message: 'Password must be at least 8 characters'
            });
        }

        const isMatch = await bcrpt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Incorrect password'
            });
        }

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    Signup,
    Login
}