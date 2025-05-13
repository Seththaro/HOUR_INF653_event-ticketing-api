const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  bookEvent,
  validateQR,
  getUserBookings,
  getBookingById
} = require('../controllers/bookingController');

// Book tickets (user only)
router.post('/', protect, bookEvent);

// Validate ticket via QR code (public)
router.get('/validate/:qr', validateQR);

// Get all bookings for logged-in user
router.get('/', protect, getUserBookings);

// Get specific booking by ID for user
router.get('/:id', protect, getBookingById);

module.exports = router;