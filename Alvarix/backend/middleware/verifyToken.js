const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  try {

    // ambil authorization header
    const authHeader = req.headers.authorization

    // cek apakah ada header
    if (!authHeader) {
      return res.status(401).json({
        error: 'Token required'
      })
    }

    // format: Bearer token
    const token = authHeader.split(' ')[1]

    // cek token kosong
    if (!token) {
      return res.status(401).json({
        error: 'Invalid token format'
      })
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    // simpan user data ke request
    req.user = decoded

    next()

  } catch (err) {

    console.error('VERIFY TOKEN ERROR:', err)

    return res.status(401).json({
      error: 'Invalid token'
    })
  }
}

module.exports = verifyToken