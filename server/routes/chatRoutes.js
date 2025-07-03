const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatMessage = require('../models/ChatMessage');
const auth = require('../middleware/authMiddleware');

// Debug middleware
router.use((req, res, next) => {
  console.log(`Chat Route: ${req.method} ${req.originalUrl}`);
  console.log('Auth header:', req.headers.authorization ? 'Present' : 'Missing');
  next();
});

// Save chat message
router.post('/save', auth, async (req, res) => {
  try {
    const { type, text, time } = req.body;
    if (!type || !text) return res.status(400).json({ success: false, error: 'Type and text are required' });

    const newMessage = new ChatMessage({
      userId: req.user.id,
      type,
      text,
      time: time || new Date().toISOString()
    });

    await newMessage.save();
    res.status(200).json({ success: true, message: 'Chat message saved', data: newMessage });
  } catch (err) {
    console.error('Save chat error:', err.message);
    res.status(500).json({ success: false, error: 'Server error', details: err.message });
  }
});

// Get chat history
router.get('/history', auth, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get recent messages
router.get('/recent', auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const messages = await ChatMessage.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(limit);
    res.status(200).json(messages.reverse());
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Delete all chat history
router.delete('/history', auth, async (req, res) => {
  try {
    const result = await ChatMessage.deleteMany({ userId: req.user.id });
    res.status(200).json({ success: true, message: `Deleted ${result.deletedCount} messages` });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Delete one message
router.delete('/message/:id', auth, async (req, res) => {
  try {
    const message = await ChatMessage.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Chat statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await ChatMessage.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$type', count: { $sum: 1 }, lastMessage: { $max: '$createdAt' } } }
    ]);

    const totalMessages = await ChatMessage.countDocuments({ userId });

    res.status(200).json({
      success: true,
      stats: {
        total: totalMessages,
        byType: stats,
        lastActivity: stats.length ? Math.max(...stats.map(s => new Date(s.lastMessage).getTime())) : null
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
