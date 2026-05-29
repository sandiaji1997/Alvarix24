function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  })
}

function errorHandler(err, req, res, next) {
  const isProduction = process.env.NODE_ENV === 'production'

  console.error('SERVER ERROR:', {
    message: err.message,
    stack: isProduction ? undefined : err.stack,
    path: req.originalUrl,
    method: req.method
  })

  res.status(err.status || 500).json({
    success: false,
    error: isProduction ? 'Internal Server Error' : err.message
  })
}

module.exports = {
  notFoundHandler,
  errorHandler
}
