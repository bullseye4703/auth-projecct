const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password, fullName, gender, dob, country } = req.body;
    try {
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ username, email, password, fullName, gender, dob, country });
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);  // Log the exact error
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};


exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.searchUser = async (req, res) => {
    const { username, email } = req.query;
    try {
        const user = await User.findOne({ $or: [{ username }, { email }] }).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
};