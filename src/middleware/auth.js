const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes (must be logged in)
exports.protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authorized, token missing' });
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to request, without password
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ error: 'Not authorized, token invalid' });
  }
};

// Restrict to specific roles
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: `Requires one of [${roles.join(', ')}]` });
  }
  next();
};
