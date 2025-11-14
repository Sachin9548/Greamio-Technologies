const { z } = require('zod');

const createEnquirySchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

const updateEnquirySchema = z.object({
  customerName: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  message: z.string().min(10).max(1000).optional(),
  status: z.enum(['new', 'in-progress', 'closed']).optional(),
  assignedTo: z.string().optional(),
});

const validateCreateEnquiry = (req, res, next) => {
  try {
    createEnquirySchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
};

const validateUpdateEnquiry = (req, res, next) => {
  try {
    updateEnquirySchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
};

module.exports = {
  validateCreateEnquiry,
  validateUpdateEnquiry,
};
