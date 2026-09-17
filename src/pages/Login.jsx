import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Lock, Mail, Key } from "lucide-react";
import { useApp } from "../context/AppContext";
import Logo from "../components/common/Logo";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!username.trim() || !password.trim()) return;

    setError("");
  const result = await login(username, password);
  if (result.success) {
    const isAdmin = result.user?.role === "admin" || result.user?.role === "super_admin";
    navigate(isAdmin ? "/admin/dashboard" : "/dashboard");
    } else {
      setError(result.message || "Login gagal. Periksa kembali data Anda.");
  }
};

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <Logo />
          <h2>Masuk ke Portal</h2>
          <p>Masukkan username dan kata sandi Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="form-error" role="alert">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="Username Anda"
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
            <Lock size={16} /> Masuk Sekarang
          </button>
        </form>

        <div className="auth-switch">
          Belum punya akun?{" "}
          <Link to="/register" className="auth-link">
            Daftar Akun
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