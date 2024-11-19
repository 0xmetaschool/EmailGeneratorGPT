// models/User.js
import mongoose from 'mongoose';
import { ensureCollection } from '@/lib/db';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  hashedPassword: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetToken: String,
  resetTokenExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  // Collection name will be automatically generated if not provided
});

// Use ensureCollection instead of mongoose.model directly
export default mongoose.models.User || ensureCollection('User', UserSchema);