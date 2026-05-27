require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')
const apiKeyRoutes = require('./routes/apiKeyRoutes')
const riskRoutes = require('./routes/riskRoutes')

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/apikey', apiKeyRoutes)
app.use('/api', riskRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected')
})
.catch(err => {
  console.log(err)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})