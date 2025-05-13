const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  const filter = {};
  if(req.query.category) filter.category = req.query.category;
  if(req.query.date)     filter.date = new Date(req.query.date);
  const events = await Event.find(filter);
  res.json(events);
};

exports.getEvent = async (req, res) => {
  const ev = await Event.findById(req.params.id);
  if(!ev) return res.status(404).json({ error:'Not found' });
  res.json(ev);
};

exports.createEvent = async (req, res) => {
  const ev = await Event.create(req.body);
  res.status(201).json(ev);
};

exports.updateEvent = async (req, res) => {
  const ev = await Event.findById(req.params.id);
  if(!ev) return res.status(404).json({ error:'Not found' });
  if(req.body.seatCapacity < ev.bookedSeats)
    return res.status(400).json({ error:'Capacity too low' });
  Object.assign(ev, req.body);
  await ev.save();
  res.json(ev);
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ error: 'Not found' });

    const hasBookings = await require('../models/Booking').exists({ event: ev._id });
    if (hasBookings) 
      return res.status(400).json({ error: 'Event has bookings' });

    // deleteOne() works on the document directly
    await ev.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all events (with optional filters)
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res, next) => {
  try {
    // Build a dynamic filter object
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.date)     filter.date     = new Date(req.query.date);
    if (req.query.venue)    filter.venue    = req.query.venue;

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};