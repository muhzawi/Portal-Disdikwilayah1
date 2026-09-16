import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Logo from "../components/Logo";
import Button from "../components/Button";

function Login() {
  const { user, login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("pegawai@disdikwil1.go.id");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  if (user) return <Navigate to="/dashboard" replace />;
  const submit = (event) => {
    event.preventDefault();
    if (!email || !password) return setError("Email dan password wajib diisi.");
    login(email);
    navigate("/dashboard");
  };
  return (
    <div className="auth-page">
      <div className="auth-aside">
        <Logo />
        <div>
          <span className="pill">PORTAL SSO</span>
          <h1>
            Semua layanan,
            <br />
            <em>satu akses.</em>
          </h1>
          <p>
            Kelola aktivitas layanan pendidikan Anda melalui portal terpusat
            yang aman dan mudah digunakan.
          </p>
        </div>
        <span className="auth-aside-footer">
          © 2025 Disdik Wilayah 1 Sumatera Utara
        </span>
      </div>
      <main className="auth-main">
        <div className="auth-form">
          <Link className="back-link" to="/">
            <ArrowRight size={16} className="back-icon" /> Kembali ke beranda
          </Link>
          <span className="eyebrow">Selamat datang kembali</span>
          <h2>Masuk ke portal</h2>
          <p className="form-intro">
            Gunakan akun organisasi Anda untuk melanjutkan.
          </p>
          <form onSubmit={submit}>
            <label>
              Email organisasi
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@instansi.go.id"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="form-row">
              <label className="check">
                <input type="checkbox" defaultChecked /> Ingat saya
              </label>
              <a href="#forgot">Lupa password?</a>
            </div>
            {error && <div className="form-error">{error}</div>}
            <Button type="submit">
              Masuk ke portal <ArrowRight size={17} />
            </Button>
          </form>
          <p className="auth-note">
            Dengan masuk, Anda menyetujui ketentuan penggunaan portal.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
