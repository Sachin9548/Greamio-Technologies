const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// Get all users
router.get('/', getUsers);

// Create new user
router.post('/', createUser);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;
