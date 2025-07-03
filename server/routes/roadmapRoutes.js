const express = require('express');
const router = express.Router();
const { generateRoadmap } = require('../controllers/roadmapController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, generateRoadmap);

module.exports = router;
