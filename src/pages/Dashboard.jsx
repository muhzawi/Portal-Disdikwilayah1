import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { applications } from "../data/applications";
import AppCard from "../components/cards/AppCard";
import { ArrowRight, Clock3, Sparkles, Star } from "lucide-react";

export default function Dashboard() {
  const { user, favorites, recent } = useApp();
  const favoriteApps = applications.filter((app) => favorites.includes(app.id));
  const recentApps = recent
    .map((id) => applications.find((app) => app.id === id))
    .filter(Boolean);

  return (
    <div className="dashboard-content dashboard-home">
      <div className="page-header dashboard-welcome">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> Portal terpusat</span>
          <h1>Selamat datang kembali, {user.nama_lengkap || user.username}</h1>
          <p>Pilih layanan yang ingin Anda akses hari ini.</p>
        </div>
        <span className="welcome-date">Semua layanan dalam satu tempat</span>
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
            <Clock3 size={18} /> Baru Saja Dibuka
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
