const express = require('express');
const router = express.Router();
const { queryOllama } = require('../services/ollamaService');

// POST /api/coverletter/generate
router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await queryOllama(prompt);
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
