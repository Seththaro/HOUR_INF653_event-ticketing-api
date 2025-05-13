require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Global middleware
app.use(cors());
app.use(express.json());

// Welcome page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Event Ticketing API</h1>');
});

// API routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/events',  require('./routes/events'));
app.use('/api/bookings',require('./routes/bookings'));
app.use('/api/admin',   require('./routes/admin'));

// Catch-all for anything else (no path argument)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (req.headers.accept?.includes('text/html')) {
    res.status(err.status || 500).send('<h1>404 Not Found</h1>');
  } else {
    res.status(err.status || 500).json({ error: err.message || 'Server Error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
