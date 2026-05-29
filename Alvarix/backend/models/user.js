const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true
  },
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'founder'],
    default: 'user'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('user', userSchema)
