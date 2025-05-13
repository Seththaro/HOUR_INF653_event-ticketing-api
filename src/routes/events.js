const r = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/eventController');

r.get('/', c.getEvents);
r.get('/:id', c.getEvent);
r.post('/', protect, authorize('admin'), c.createEvent);
r.put('/:id', protect, authorize('admin'), c.updateEvent);
r.delete('/:id', protect, authorize('admin'), c.deleteEvent);

module.exports = r;
