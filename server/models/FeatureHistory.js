// server/models/FeatureHistory.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featureHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 🔗 Linked to User
  featureName: { type: String, required: true }, // e.g., "Roadmap Generator"
  result: { type: Schema.Types.Mixed }, // store any data (text or object)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeatureHistory', featureHistorySchema);
