const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isValidGsuiteEmail, isValidGsuiteDomain } = require('../utils/emailUtils');
const aiEmailVerify = require('../utils/aiEmailVerify');

const AI_KEY = process.env.AI_API_KEY || '';

// POST /api/verify/student
router.post('/student', async (req, res) => {
  try {
    const { name, studentId, gsuiteEmail } = req.body;

    if (!name || !studentId || !gsuiteEmail) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // 1️⃣ Check G-Suite domain
    if (!isValidGsuiteDomain(gsuiteEmail)) {
      return res.status(400).json({ success: false, message: 'Email domain must be @g.bracu.ac.bd' });
    }

    // 2️⃣ Check email matches full name
    if (!isValidGsuiteEmail(name, gsuiteEmail)) {
      return res.status(400).json({ success: false, message: 'Email does not match full name exactly' });
    }

    // 3️⃣ AI/email verification
    const aiRes = await aiEmailVerify(gsuiteEmail, AI_KEY);

    // 4️⃣ Create or update user in DB
    let user = await User.findOne({ studentId });
    if (!user) {
      user = await User.create({ name, studentId, gsuiteEmail, isVerified: aiRes.success });
    } else {
      user.isVerified = aiRes.success;
      await user.save();
    }

    res.json({
      success: aiRes.success,
      reason: aiRes.success ? 'PASS' : 'FAIL',
      details: aiRes
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;




