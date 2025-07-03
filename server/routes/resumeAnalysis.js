const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeResumeWithAI } = require('../controllers/resumeController');
const auth = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/analyze-ai', auth, upload.single('resume'), analyzeResumeWithAI);

module.exports = router;