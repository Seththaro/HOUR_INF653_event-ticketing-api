const Booking = require('../models/Booking');
const Event = require('../models/Event');
const generateQRCode = require('../utils/generateQRCode');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc    Book tickets for an event (user only)
 * @route   POST /api/bookings
 * @access  Private (user)
 */
exports.bookEvent = async (req, res, next) => {
  try {
    const { event: eventId, quantity } = req.body;
    const ev = await Event.findById(eventId);
    if (!ev) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (ev.bookedSeats + quantity > ev.seatCapacity) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    ev.bookedSeats += quantity;
    await ev.save();

    // Generate QR code for booking
    const qrPayload = `${req.user._id}_${eventId}_${Date.now()}`;
    const qrCode = await generateQRCode(qrPayload);

    // Create booking record
    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      quantity,
      qrCode,
    });

    // Send confirmation email
    const emailContent = `
      <h2>Booking Confirmation</h2>
      <p>Hi ${req.user.name},</p>
      <p>Your booking for <strong>${ev.title}</strong> on ${ev.date.toDateString()} at ${ev.time} has been confirmed.</p>
      <p>Quantity: ${quantity}</p>
      <p>Please present the following QR code at entry:</p>
      <img src="${qrCode}" alt="QR Code" />
    `;
    await sendEmail({
      to: req.user.email,
      subject: `Your tickets for ${ev.title}`,
      html: emailContent,
    });

    res.status(201).json({
      bookingId: booking._id,
      qrCode,
      message: 'Booking successful. Confirmation email sent.'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Validate a booking by QR code
 * @route   GET /api/bookings/validate/:qr
 * @access  Public
 */
exports.validateQR = async (req, res, next) => {
  try {
    const { qr } = req.params;
    const booking = await Booking.findOne({ qrCode: qr })
      .populate('event', 'title date time');
    if (!booking) {
      return res.status(200).json({ valid: false });
    }
    res.status(200).json({
      valid: true,
      booking: {
        id: booking._id,
        event: booking.event,
        quantity: booking.quantity,
        bookingDate: booking.bookingDate,
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Admin dashboard showing events with bookings
 * @route   GET /api/admin/dashboard
 * @access  Private (admin)
 */
exports.adminDashboard = async (req, res, next) => {
  try {
    const events = await Event.find().lean();
    const dashboard = await Promise.all(
      events.map(async ev => {
        const bookings = await Booking.find({ event: ev._id })
          .populate('user', 'name email');
        return {
          eventId: ev._id,
          title: ev.title,
          date: ev.date,
          totalBookings: bookings.length,
          details: bookings.map(b => ({
            userName: b.user.name,
            userEmail: b.user.email,
            quantity: b.quantity
          }))
        };
      })
    );
    res.status(200).json(dashboard);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all bookings for the current user
 * @route   GET /api/bookings
 * @access  Private (user)
 */
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('event', 'title date time venue price');
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get a specific booking (user only)
 * @route   GET /api/bookings/:id
 * @access  Private (user)
 */
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('event', 'title date time venue price');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};