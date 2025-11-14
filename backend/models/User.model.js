const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'staff', 'user'],
    default: 'user',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Create index for better performance
// Note: email already has unique index from schema
userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
