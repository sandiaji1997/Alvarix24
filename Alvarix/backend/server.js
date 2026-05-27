require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const helmet = require('helmet')

const rateLimit = require('express-rate-limit')



const authRoutes = require('./routes/authroutes')

const apiKeyRoutes = require('./routes/apikeyRoutes')

const riskRoutes = require('./routes/riskroutes')

const dashboardRoutes = require('./routes/dashboardroutes')



const app = express()



// 🔐 Helmet Security
app.use(helmet())



// 📦 JSON Parser
app.use(express.json())



// 🚦 Global Rate Limiter
const limiter = rateLimit({

  windowMs: 15 * 60 * 1000, // 15 menit

  max: 100, // max 100 request

  message: {

    error: 'Too many requests'

  }

})



app.use(limiter)



// 🚀 Routes
app.use('/api/auth', authRoutes)

app.use('/api/apikey', apiKeyRoutes)

app.use('/api', riskRoutes)

app.use('/api/dashboard', dashboardRoutes)



// 🌍 Root Endpoint
app.get('/', (req, res) => {

  res.json({

    success: true,

    message: 'Alvarix API Running'

  })

})



// 🍃 MongoDB Connect
mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log('MongoDB Connected')

})

.catch((err) => {

  console.log(err)

})



// 🚀 Start Server
app.listen(3000, () => {

  console.log('Server running on port 3000')

})