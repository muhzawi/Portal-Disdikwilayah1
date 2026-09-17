const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../connection/db");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// Accessible : Semua user yang memiliki Token Valid
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT users.id, users.username, users.nama_lengkap, roles.name AS role_name, users.created_at
       FROM users 
       JOIN roles ON users.role_id = roles.id 
       WHERE users.id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    return res.json({ user: rows[0] });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// Accessible: super_admin & admin
router.get("/", verifyToken, authorizeRoles("super_admin", "admin"), async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT users.id, users.username, users.nama_lengkap, roles.name AS role_name, users.created_at
       FROM users 
       JOIN roles ON users.role_id = roles.id 
       ORDER BY users.id DESC`
    );

    return res.json({ data: users });
  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});


// Accessible: super_admin & admin
// Update data user (nama_lengkap, password, role_id)
router.put("/:id", verifyToken, authorizeRoles("super_admin", "admin"), async (req, res) => {
  const { id } = req.params;
  const { nama_lengkap, password, role_id } = req.body;

  try {
    // Cek apakah user ada
    const [exist] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (exist.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    let query = "UPDATE users SET nama_lengkap = ?, role_id = ? WHERE id = ?";
    let queryParams = [nama_lengkap || exist[0].nama_lengkap, role_id || exist[0].role_id, id];

    // Jika password diisi, update password hash baru
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ message: "Password minimal 8 karakter!" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      query = "UPDATE users SET nama_lengkap = ?, role_id = ?, password = ? WHERE id = ?";
      queryParams = [nama_lengkap || exist[0].nama_lengkap, role_id || exist[0].role_id, hashedPassword, id];
    }

    await db.query(query, queryParams);
    return res.json({ message: "Data user berhasil diperbarui!" });
  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// Accessible: Khusus super_admin
router.delete("/:id", verifyToken, authorizeRoles("super_admin"), async (req, res) => {
  const { id } = req.params;

  try {
    // Cegah hapus diri sendiri
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ message: "Anda tidak bisa menghapus akun sendiri!" });
    }

    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    return res.json({ message: "User berhasil dihapus!" });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

module.exports = router;