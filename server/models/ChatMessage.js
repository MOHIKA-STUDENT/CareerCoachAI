const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Fixed this line
  type: { type: String, required: true }, // 'user' or 'bot'
  text: { type: String, required: true },
  // time: { type: String }
  sessionId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
