// server/routes/featureHistoryRoutes.js
const express = require('express');
const router = express.Router();
const FeatureHistory = require('../models/FeatureHistory');
const authMiddleware = require('../middleware/authMiddleware');

// 🟢 Save AI tool usage history
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { featureName, result } = req.body;

    const history = new FeatureHistory({ userId, featureName, result });
    await history.save();

    res.status(200).json({ success: true, message: 'History saved' });
  } catch (err) {
    console.error('Save feature history error:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// 🔍 Get all history for the logged-in user
router.get('/my-history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await FeatureHistory.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, history });
  } catch (err) {
    console.error('Fetch feature history error:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.delete('/my-history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await FeatureHistory.deleteMany({ userId });
    res.status(200).json({ success: true, message: 'Feature history cleared' });
  } catch (err) {
    console.error('Delete feature history error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to clear feature history' });
  }
});

module.exports = router;
