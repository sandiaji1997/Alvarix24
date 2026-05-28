require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const authroutes = require('./routes/authroutes')
const apikeyroutes = require('./routes/apikeyroutes')
const riskroutes = require('./routes/riskroutes')
const dashboardroutes = require('./routes/dashboardroutes')
const transactionroutes = require('./routes/transactionroutes')
const monitoringroutes = require('./routes/monitoringroutes')

const app = express()
const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  credentials: true
}))
app.use(express.json({ limit: '1mb' }))

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
    message: 'Alvarix API Running'
  })
})

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime()
  })
})

app.use('/api/auth', authroutes)
app.use('/api/apikey', apikeyroutes)
app.use('/api', riskroutes)
app.use('/api', transactionroutes)
app.use('/api/monitoring', monitoringroutes)
app.use('/api/dashboard', dashboardroutes)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  })
})

app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err)

  res.status(err.status || 500).json({
    success: false,
    error: isProduction ? 'Internal Server Error' : err.message
  })
})

async function start() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required')
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required')
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB Connected')

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

start().catch((err) => {
  console.error('STARTUP ERROR:', err)
  process.exit(1)
})
