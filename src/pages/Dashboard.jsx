import { ArrowRight, ClipboardList, Grid2X2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import applications from "../data/applications";
import AppCard from "../components/AppCard";

function ClockIcon() {
  return <span className="empty-clock">◷</span>;
}

function Dashboard() {
  const { user, favorites, recent } = useApp();
  const favoriteApps = applications.filter((app) => favorites.includes(app.id));
  const recentApps = recent
    .map((id) => applications.find((app) => app.id === id))
    .filter(Boolean);
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>
            Selamat pagi, {user.name} <span className="wave">✦</span>
          </h1>
          <p>Apa yang ingin Anda akses hari ini?</p>
        </div>
        <span className="date-label">Rabu, 09 September 2025</span>
      </div>
      <section className="dashboard-hero">
        <div>
          <span className="pill pill-light">Portal terpusat</span>
          <h2>
            Semua aplikasi
            <br />
            <em>untuk pekerjaan Anda.</em>
          </h2>
          <p>Temukan layanan yang Anda butuhkan dengan lebih cepat.</p>
        </div>
        <div className="dashboard-hero-shape">
          <Grid2X2 size={72} strokeWidth={1.2} />
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Akses cepat</span>
            <h2>Aplikasi saya</h2>
          </div>
          <Link className="text-link" to="/apps">
            Lihat semua <ArrowRight size={16} />
          </Link>
        </div>
        {favoriteApps.length ? (
          <div className="app-grid">
            {favoriteApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="inline-empty">
            <Star size={20} />
            <span>Belum ada aplikasi favorit.</span>
            <Link to="/apps">Jelajahi aplikasi</Link>
          </div>
        )}
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Aktivitas</span>
            <h2>Baru dibuka</h2>
          </div>
        </div>
        {recentApps.length ? (
          <div className="app-grid">
            {recentApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="inline-empty">
            <ClockIcon />
            <span>Aplikasi yang Anda buka akan muncul di sini.</span>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
