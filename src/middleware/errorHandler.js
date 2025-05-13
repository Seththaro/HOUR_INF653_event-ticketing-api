module.exports = (err, req, res, next) => {
  console.error(err);
  if (req.headers.accept?.includes('text/html')) {
    res.status(err.status || 500).send('<h1>404 Not Found</h1>');
  } else {
    res.status(err.status || 500).json({ error: err.message || 'Server Error' });
  }
};
