require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const swaggerUi = require('swagger-ui-express')

const { validateEnv, getAllowedOrigins } = require('./config/env')
const requestContext = require('./middleware/requestcontext')
const { notFoundHandler, errorHandler } = require('./middleware/errorhandler')
const openapiSpec = require('./docs/openapi')
const {
  buildBrandedSwaggerHtml,
  swaggerUiOptions
} = require('./docs/swagger')

const authroutes = require('./routes/authroutes')
const apikeyroutes = require('./routes/apikeyroutes')
const riskroutes = require('./routes/riskroutes')
const dashboardroutes = require('./routes/dashboardroutes')
const transactionroutes = require('./routes/transactionroutes')
const monitoringroutes = require('./routes/monitoringroutes')
const adminroutes = require('./routes/adminroutes')
const founderroutes = require('./routes/founderroutes')
const billingroutes = require('./routes/billingroutes')

const app = express()
const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const allowedOrigins = getAllowedOrigins()

app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(requestContext)
app.use(helmet({
  crossOriginResourcePolicy: {
    policy: 'cross-origin'
  }
}))
app.use(compression())
app.use(cors({
  origin(origin, callback) {
    if (!isProduction || !origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('CORS origin not allowed'))
  },
  credentials: true
}))
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '1mb' }))
app.use(morgan(isProduction ? 'combined' : 'dev'))

app.use(rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests'
  }
}))

app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'Alvarix AI Risk Scoring API',
    status: 'running',
    version: '1.0.0',
    docs: '/docs',
    health: '/health',
    endpoints: {
      riskScore: '/risk-score',
      auth: '/api/auth',
      apiKeys: '/api/apikey',
      billing: '/billing',
      admin: '/admin',
      founder: '/founder'
    }
  })
})

app.get('/health', (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    status: databaseConnected ? 'ok' : 'degraded',
    service: 'alvarix-backend',
    database: databaseConnected ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    requestId: req.requestId
  })
})

app.get('/openapi.json', (req, res) => {
  res.json(openapiSpec)
})

function serveSwaggerDocs(req, res) {
  res.send(buildBrandedSwaggerHtml(openapiSpec, swaggerUi))
}

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')))
app.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')))
app.get('/docs', serveSwaggerDocs)
app.get('/docs/', serveSwaggerDocs)
app.use('/docs', swaggerUi.serveFiles(openapiSpec, swaggerUiOptions))

app.use('/api/auth', authroutes)
app.use('/api/apikey', apikeyroutes)
app.use('/api', riskroutes)
app.use('/', riskroutes)
app.use('/api', transactionroutes)
app.use('/api/monitoring', monitoringroutes)
app.use('/api/dashboard', dashboardroutes)
app.use('/billing', billingroutes)
app.use('/admin', adminroutes)
app.use('/founder', founderroutes)

function servePublicPage(pageName) {
  return (req, res) => {
    res.sendFile(path.join(__dirname, '..', pageName, 'index.html'))
  }
}

app.get('/pricing', servePublicPage('pricing'))
app.get('/pricing/', servePublicPage('pricing'))
app.get('/terms', servePublicPage('terms'))
app.get('/terms/', servePublicPage('terms'))
app.get('/privacy', servePublicPage('privacy'))
app.get('/privacy/', servePublicPage('privacy'))
app.get('/refund', servePublicPage('refund'))
app.get('/refund/', servePublicPage('refund'))
app.get('/contact', servePublicPage('contact'))
app.get('/contact/', servePublicPage('contact'))
app.get('/login', servePublicPage('login'))
app.get('/login/', servePublicPage('login'))

app.use(notFoundHandler)
app.use(errorHandler)

let server

async function start() {
  validateEnv()

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS) || 10000
  })

  console.log('MongoDB Connected')

  server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

async function shutdown(signal) {
  console.log(`${signal} received, shutting down gracefully`)

  if (server) {
    server.close(async () => {
      await mongoose.connection.close(false)
      process.exit(0)
    })
  } else {
    await mongoose.connection.close(false)
    process.exit(0)
  }

  setTimeout(() => {
    console.error('Forced shutdown after timeout')
    process.exit(1)
  }, Number(process.env.SHUTDOWN_TIMEOUT_MS) || 10000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

start().catch((err) => {
  console.error('STARTUP ERROR:', err)
  process.exit(1)
})
