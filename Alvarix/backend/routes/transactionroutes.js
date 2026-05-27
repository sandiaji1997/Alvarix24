const express = require("express");
const router = express.Router();
const transaction = require("../models/transaction");
const riskengine = require("../services/riskengine");
const apikeyMiddleware = require("../middleware/apikeyMiddleware");

// 🔐 PROTECTED ROUTES
router.post("/transactions", apikeyMiddleware, async (req, res) => {
  try {
    const { userId, amount, status } = req.body;

    const riskResult = await riskengine({
      userId,
      amount,
      status,
      location: "indonesia",
      behaviorScore: 50,
    });

    const newtransaction = new transaction({
      userId,
      amount,
      status,
      riskScore: riskResult.risk_score,
    });

    await newtransaction.save();

    res.json({
      success: true,
      risk: riskResult,
      data: newtransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// 🔐 PROTECTED GET
router.get("/transactions", apikeyMiddleware, async (req, res) => {
  try {
    const data = await transaction.find();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
