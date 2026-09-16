import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, UserPlus, User, Key } from "lucide-react";
import { useApp } from "../context/AppContext";
import Logo from "../components/common/Logo";

export default function Register() {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaLengkap.trim() || !username.trim() || !password.trim()) return;

    const result = await register(namaLengkap, username, password);
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <Logo />
          <h2>Buat Akun Baru</h2>
          <p>Daftar untuk mengakses seluruh aplikasi portal.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="namaLengkap">Nama Lengkap</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="namaLengkap"
                type="text"
                placeholder="Nama Lengkap"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="Minimal 8 karakter, huruf & angka"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Kata Sandi</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="button button-primary full-width">
            <UserPlus size={16} /> Daftar Sekarang
          </button>
        </form>

        <div className="auth-switch">
          Sudah punya akun?{" "}
          <Link to="/login" className="auth-link">
            Masuk di sini
          </Link>
        </div>

        <div className="login-footer">
          <button onClick={() => navigate("/")} className="back-link">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}