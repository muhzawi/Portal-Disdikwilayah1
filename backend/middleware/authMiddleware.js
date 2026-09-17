const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan." });
  }

  if (token === "null" || token === "undefined") {
    return res.status(401).json({ message: "Akses ditolak! Token tidak valid." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan payload user (id, username, role) ke request
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Token tidak valid atau sudah kadaluwarsa!" });
  }
};

// Middleware Pengecekan Role (RBAC) singkatan dari RBAC adalah Role-Based Access Control
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Akses ditolak! Anda tidak memiliki izin untuk mengakses resource ini." 
      });
    }
    
    next();
  };
};

module.exports = { verifyToken, authorizeRoles };