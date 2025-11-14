const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'closed'],
    default: 'new',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Create indexes for better performance
enquirySchema.index({ status: 1, isDeleted: 1 });
enquirySchema.index({ createdBy: 1, isDeleted: 1 });
enquirySchema.index({ assignedTo: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ customerName: 'text', email: 'text', phone: 'text' });

module.exports = mongoose.model('Enquiry', enquirySchema);
