const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateCanonicalGsuite } = require('../utils/emailUtils');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, studentId, gsuiteEmail, password } = req.body;
    if (!name || !studentId || !gsuiteEmail || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user exists
    const existing = await User.findOne({ studentId });
    if (existing) return res.status(400).json({ success: false, message: 'Student ID already registered' });

    // Ensure email matches canonical format
    const canonicalEmail = generateCanonicalGsuite(name);
    if (canonicalEmail !== gsuiteEmail.toLowerCase()) {
      return res.status(400).json({ success: false, message: 'Email does not match full name' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      studentId,
      gsuiteEmail,
      password: hashedPassword
    });

    res.json({ success: true, message: 'User registered', userId: user._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;
    if (!studentId || !password) return res.status(400).json({ success: false, message: 'All fields are required' });

    const user = await User.findOne({ studentId });
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success: false, message: 'Incorrect password' });

    if (!user.isVerified) return res.status(403).json({ success: false, message: 'User not verified' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { name: user.name, studentId: user.studentId, gsuiteEmail: user.gsuiteEmail } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
