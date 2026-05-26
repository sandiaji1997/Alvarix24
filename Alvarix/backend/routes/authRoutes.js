const express = require("express")
const router = express.Router()

// TEST ROUTE
router.get("/", (req, res) => {
  res.json({ message: "Auth API working 🚀" })
})

// REGISTER
router.post("/register", (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: "Email dan password wajib"
    })
  }

  res.json({
    message: "Register berhasil ✅",
    user: {
      email
    }
  })
})

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: "Email dan password wajib"
    })
  }

  res.json({
    message: "Login berhasil ✅",
    token: "dummy-jwt-token"
  })
})

module.exports = router
