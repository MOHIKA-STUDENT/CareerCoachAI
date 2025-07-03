// models/Roadmap.js
const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  goal: String,
  education: String,
  skills: String,
  roadmapText: String,
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
