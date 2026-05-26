const express = require("express");
const router = express.Router();

// TEST ROUTE (WAJIB ADA)
router.get("/", (req, res) => {
  res.json({ message: "API OK 🚀" });
});

module.exports = router;
