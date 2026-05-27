const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const riskEngine = require("../services/riskEngine");
const apiKeyMiddleware = require("../middleware/apiKeyMiddleware");

// 🔐 PROTECTED ROUTES
router.post("/transactions", apiKeyMiddleware, async (req, res) => {
  try {
    const { userId, amount, status } = req.body;

    const riskResult = await riskEngine({
      userId,
      amount,
      status,
      location: "indonesia",
      behaviorScore: 50,
    });

    const newTransaction = new Transaction({
      userId,
      amount,
      status,
      riskScore: riskResult.risk_score,
    });

    await newTransaction.save();

    res.json({
      success: true,
      risk: riskResult,
      data: newTransaction,
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
router.get("/transactions", apiKeyMiddleware, async (req, res) => {
  try {
    const data = await Transaction.find();

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