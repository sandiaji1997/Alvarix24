const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET']

function validateEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key])

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

function getAllowedOrigins() {
  if (!process.env.CORS_ORIGIN) return []

  return process.env.CORS_ORIGIN
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

module.exports = {
  validateEnv,
  getAllowedOrigins
}
