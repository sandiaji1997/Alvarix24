require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')
const apiKeyRoutes = require('./routes/apiKeyRoutes')
const riskRoutes = require('./routes/riskRoutes')

const app = express()

app.use(express.json())

// ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/apikey', apiKeyRoutes)
app.use('/api', riskRoutes)

// TEST ROUTE
app.get('/', (req, res) => {
  res.json({
    status: 'Alvarix API Running'
  })
})

// MONGODB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected')
})
.catch((err) => {
  console.log(err)
})

// RAILWAY PORT FIX
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})