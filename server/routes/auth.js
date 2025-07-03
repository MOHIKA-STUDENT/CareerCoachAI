// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// @route    GET /api/auth/me
// @desc     Get logged in user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('❌ /me error:', err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// @route    POST /api/auth/signup
// @desc     Register user
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // ✅ Validate input
  if (!firstName || !email || !password) {
    return res.status(400).json({ msg: 'First name, email, and password are required' });
  }

  try {
    // 🔍 Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Create user
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    // 🪙 Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      msg: 'User created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('❌ Signup error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route    POST /api/auth/login
// @desc     Authenticate user and get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  try {
    // 🔍 Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // 🪙 Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
