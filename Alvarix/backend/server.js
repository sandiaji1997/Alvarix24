require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
const routes = require("./routes");
app.use("/api", routes);

// ROOT CHECK
app.get("/", (req, res) => {
  res.send("Alvarix API is running 🚀");
});

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
