const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Role = require('../model/role');
const { hashPassword, verifyPassword, generateToken } = require('../auth');

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ username, email, password: hashedPassword });
        const token = generateToken(newUser);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !await verifyPassword(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
});

module.exports = router;
