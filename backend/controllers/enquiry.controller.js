const Enquiry = require('../models/Enquiry.model');

// Create new enquiry
const createEnquiry = async (req, res) => {
  try {
    const { customerName, email, phone, message } = req.body;

    const enquiry = await Enquiry.create({
      customerName,
      email,
      phone,
      message,
      createdBy: req.userId, // Track who created it
    });

    res.status(201).json({
      message: 'Enquiry created successfully',
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all enquiries with filters
const getEnquiries = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    
    // Build filter
    const filter = { isDeleted: false };
    
    // Regular users can only see their own enquiries
    // Admin and staff can see all enquiries
    if (req.userRole === 'user') {
      filter.createdBy = req.userId;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Enquiry.countDocuments(filter);

    const enquiries = await Enquiry.find(filter)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ 
      enquiries,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single enquiry by ID
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findOne({
      _id: req.params.id,
      isDeleted: false,
    })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    // Check permissions
    // Regular users can only view their own enquiries
    // Admin and staff can view all enquiries
    if (req.userRole === 'user' && enquiry.createdBy._id.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only view your own enquiries' });
    }

    res.json({ enquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update enquiry
const updateEnquiry = async (req, res) => {
  try {
    const { customerName, email, phone, message, status, assignedTo } = req.body;

    // Find enquiry first to check ownership
    const enquiry = await Enquiry.findOne({ _id: req.params.id, isDeleted: false });

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    // Check permissions
    // Regular users can only edit their own enquiries
    // Admin and staff can edit all enquiries
    if (req.userRole === 'user' && enquiry.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only edit your own enquiries' });
    }

    // Update enquiry
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { customerName, email, phone, message, status, assignedTo },
      { new: true, runValidators: true }
    )
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    res.json({
      message: 'Enquiry updated successfully',
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Soft delete enquiry
const deleteEnquiry = async (req, res) => {
  try {
    // Find enquiry first to check ownership
    const enquiry = await Enquiry.findOne({ _id: req.params.id, isDeleted: false });

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    // Check permissions
    // Regular users can only delete their own enquiries
    // Admin and staff can delete all enquiries
    if (req.userRole === 'user' && enquiry.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only delete your own enquiries' });
    }

    // Soft delete
    await Enquiry.findByIdAndUpdate(req.params.id, { isDeleted: true });

    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
