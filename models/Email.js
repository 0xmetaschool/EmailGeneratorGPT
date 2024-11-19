import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  type: String,
  tone: String,
  prompt: String,
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Ensure indexes for better query performance
emailSchema.index({ userId: 1, timestamp: -1 });

const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);
export default Email;
