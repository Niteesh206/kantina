const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const { secretOrKey } = require('../config');

const router = express.Router();

// Register Route
// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Get the total number of users in the database
    const userCount = await User.countDocuments({});

    // Assign 'admin' role if the user count is less than 5, otherwise assign 'user'
    const role = userCount < 3 ? 'admin' : 'user';

    // Create new user with the determined role
    const newUser = new User({ name, email, password, role });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    // Sign token
    jwt.sign(payload, secretOrKey, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({
        success: true,
        token: 'Bearer ' + token,
        role: user.role, // Include role for frontend
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
