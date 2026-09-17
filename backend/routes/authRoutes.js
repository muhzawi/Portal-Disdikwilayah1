const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../connection/db");


// REGISTER (/api/auth/register)
router.post("/register", async (req, res) => {
  const { username, password, nama_lengkap } = req.body; // role_id dihapus dari sini
  const DEFAULT_ROLE_ID = 3; // ganti sesuai id "staf" di tabel roles kamu

  if (!username || !password || !nama_lengkap) {
    return res.status(400).json({ message: "wajib mengisi seluruh form!" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Maaf Password minimal 8 karakter!" });
  }

  if (nama_lengkap.length < 8) {
    return res.status(400).json({ message: "Nama lengkap minimal 8 karakter!" });
  }

  if (username.length < 8) {
    return res.status(400).json({ message: "Username minimal 8 karakter!" });
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(400).json({ message: "Username hanya boleh mengandung huruf dan angka!" });
  }

  if (!/^[a-zA-Z\s',.]+$/.test(nama_lengkap)) {
    return res.status(400).json({ message: "Nama lengkap hanya boleh mengandung huruf dan spasi!" });
  }

  try {
    const [roles] = await db.query("SELECT id FROM roles WHERE id = ?", [DEFAULT_ROLE_ID]);
    if (roles.length === 0) {
      return res.status(500).json({ message: "Role default tidak ditemukan, hubungi admin!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      "INSERT INTO users (username, password, nama_lengkap, role_id) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, nama_lengkap, DEFAULT_ROLE_ID]
    );

    return res.status(201).json({ message: "User berhasil didaftarkan!" });
  } 
  
catch (error) {
    console.error("Register Error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Username sudah digunakan!" });
    }

    if (error.code === "ER_DATA_TOO_LONG") {
      return res.status(400).json({ message: "Data terlalu panjang, periksa input Anda!" });
    }

    if (error.code === "ER_BAD_NULL_ERROR") {
      return res.status(400).json({ message: "Data tidak boleh kosong!" });
    }

    if (error.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
      return res.status(400).json({ message: "Format data salah, periksa input Anda Kembali!" });
    }

    if (error.code === "ER_LOCK_WAIT_TIMEOUT") {
      return res.status(503).json({ message: "Server sibuk, silakan coba lagi nanti!" });
    }


    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// ENDPOINT LOGIN (/api/auth/login)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validasi input wajib
  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi!" });
  }

  if (username.length < 8) {
    return res.status(400).json({ message: "Username minimal 8 karakter!" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password minimal 8 karakter!" });
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(400).json({ message: "Username hanya boleh mengandung huruf dan angka!" });
  }


  try {
    const [rows] = await db.query(
      `SELECT users.*, roles.name AS role_name 
       FROM users 
       JOIN roles ON users.role_id = roles.id 
       WHERE users.username = ?`,
      [username]
    );

    const user = rows[0];
    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role_name 
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" } 
    );

    return res.json({
      message: "Login berhasil!",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        nama_lengkap: user.nama_lengkap,
        role: user.role_name
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

module.exports = router;