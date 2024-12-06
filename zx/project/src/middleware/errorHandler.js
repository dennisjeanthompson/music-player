function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  if (req.xhr || req.headers.accept.includes('application/json')) {
    return res.status(500).json({
      error: 'Something went wrong!',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  
  res.status(500).render('error', {
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
}

module.exports = errorHandler;