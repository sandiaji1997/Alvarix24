const jwt = require('jsonwebtoken')

const verifytoken = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        error: 'Token required'
      })
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Invalid token format'
      })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = decoded

    next()

  } catch (err) {

    console.error('VERIFY TOKEN ERROR:', err)

    return res.status(401).json({
      error: 'Invalid token'
    })
  }
}

module.exports = verifytoken
