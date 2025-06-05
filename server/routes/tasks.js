const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get paginated tasks (admin only)
router.get('/', auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  try {
    const tasks = await Task.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('assignedTo', 'username')
      .populate('createdBy', 'username');
    const total = await Task.countDocuments();
    res.json({ tasks, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});

// Create task (user only)
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({
      title,
      description,
      createdBy: req.user._id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
});

module.exports = router;