const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Get all users (admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Change user status (admin only)
router.patch('/:id/status', auth, admin, async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = status;
    user.tokenVersion += 1; // Invalidate existing JWTs
    await user.save();
    res.json({ message: 'User status updated and sessions invalidated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
});

module.exports = router;