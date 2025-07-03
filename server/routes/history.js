const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Sample in-memory data (replace with DB later)
const sampleHistory = {
  // Replace with real user._id
  '666abc...': [
    { date: 'June 17, 2025', activity: 'Generated resume for Software Engineer' },
    { date: 'June 16, 2025', activity: 'Asked about switching careers' }
  ]
};

router.get('/', auth, (req, res) => {
  const history = sampleHistory[req.user.id] || [];
  res.json({ history });
});

module.exports = router;
