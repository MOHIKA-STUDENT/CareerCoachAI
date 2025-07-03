const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/aiController');
const auth = require('../middleware/authMiddleware'); // Import auth middleware

// Apply auth middleware to protect the chat endpoint
router.post('/chat', auth, chatWithAI); // ✅ Now includes authentication

module.exports = router;