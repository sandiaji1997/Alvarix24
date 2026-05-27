const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../models/user');

// ================= REGISTER =================
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      email,
      password: hashedPassword
    });

    res.json({ message: 'user registered' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= LOGIN =================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", email);

    const user = await user.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const token = jwt.sign(
   {
    userId: user._id
   },
   process.env.JWT_SECRET,
   {
    expiresIn: '24h'
   }
 )

    res.json({
      message: 'Login success',
      token
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

