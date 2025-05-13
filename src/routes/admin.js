const r = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const { adminDashboard } = require('../controllers/bookingController');

r.get('/dashboard', protect, authorize('admin'), adminDashboard);

module.exports = r;
