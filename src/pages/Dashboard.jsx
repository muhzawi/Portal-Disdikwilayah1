import { Link } from "react-router-dom";
import { Grid2X2, ArrowRight, Star, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { applications } from "../data/applications";
import AppCard from "../components/cards/AppCard";

export default function Dashboard() {
  const { user, favorites, recent } = useApp();

  const favoriteApps = applications.filter((app) => favorites.includes(app.id));
  const recentApps = recent
    .map((id) => applications.find((app) => app.id === id))
    .filter(Boolean);

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Selamat datang kembali, {user.nama_lengkap || user.username} </h1>{" "}
        <p>Akses seluruh layanan portal pendidikan dalam satu tempat.</p>
      </div>

      <div className="dashboard-hero">
        <div className="hero-text">
          <span className="hero-tag">Portal Terpusat</span>
          <h2>Semua Aplikasi Pekerjaan Anda</h2>
          <p>
            Temukan dan jalankan aplikasi administrasi & pendidikan lebih cepat
            tanpa ribet.
          </p>
        </div>
        <Grid2X2 className="hero-bg-icon" size={160} />
      </div>

      <section className="dashboard-section">
        <div className="section-title-row">
          <h2>
            <Star className="text-amber" size={18} /> Aplikasi Favorit
          </h2>
          <Link to="/apps" className="link-more">
            Lihat semua <ArrowRight size={14} />
          </Link>
        </div>

        {favoriteApps.length ? (
          <div className="apps-grid">
            {favoriteApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada aplikasi yang ditambahkan ke favorit.</p>
            <Link to="/apps">Jelajahi Katalog Aplikasi</Link>
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <div className="section-title-row">
          <h2>
            <Clock size={18} /> Baru Saja Dibuka
          </h2>
        </div>

        {recentApps.length ? (
          <div className="apps-grid">
            {recentApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <p className="empty-text">
            Aplikasi yang sering Anda buka akan muncul di sini.
          </p>
        )}
      </section>
    </div>
  );
}
