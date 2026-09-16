const express = require("express");
const cors = require("cors");
const db = require("./connection/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors()); // inituh biar bisa diakses dari domain lain karena port BE dan FE beda jadi cors ini fungsinya biar BE bisa kirim request ke FE tanpa kehalang browser (Cross-Origin Resource Sharing)
app.use(express.json()); // inituh Untuk membaca request body jadi nanti keluarannya adalah JSON

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("API Disdik Wilayah 1 Running...");
});

// Start Server
app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});