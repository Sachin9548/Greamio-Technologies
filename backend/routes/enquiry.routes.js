const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiry.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validateCreateEnquiry, validateUpdateEnquiry } = require('../validators/enquiry.validator');

// All routes require authentication
router.use(authenticate);

// Create new enquiry
router.post('/', validateCreateEnquiry, createEnquiry);

// Get all enquiries (with filters)
router.get('/', getEnquiries);

// Get single enquiry
router.get('/:id', getEnquiryById);

// Update enquiry
router.put('/:id', validateUpdateEnquiry, updateEnquiry);

// Delete enquiry (soft delete)
router.delete('/:id', deleteEnquiry);

module.exports = router;
