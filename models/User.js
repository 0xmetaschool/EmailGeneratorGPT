// models/User.js
import mongoose from 'mongoose';

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
  timestamps: true
});

// Create the model if it doesn't exist, or use the existing one
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;