const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  score: { type: Number, required: true },
  summary: { type: String },
  skills: { type: Object }, // e.g., { HTML: 90, CSS: 80 }
  tips: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
