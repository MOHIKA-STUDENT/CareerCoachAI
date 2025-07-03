const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const chatRoutes = require('./routes/chatRoutes');
const featureHistoryRoutes = require('./routes/featureHistoryRoutes');
const resumeRoutes = require('./routes/resumeAnalysis');
const roadmapRoutes = require('./routes/roadmapRoutes');
const coverLetterRoutes = require('./routes/coverletter');

const app = express();

// ✅ CORS Setup (make sure this comes before routes)
app.use(cors({
  origin: 'http://localhost:3000', // ✅ Allow frontend origin
  credentials: true,               // ✅ Allow credentials if needed
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/feature-history', featureHistoryRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/roadmaps', roadmapRoutes); 
app.use('/api/coverletter', coverLetterRoutes);

// ✅ Basic test route
app.get('/', (req, res) => {
  res.send('CareerCoachAI Server is running!');
});

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
