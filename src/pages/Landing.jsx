import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn, Sparkles } from "lucide-react";
import { applications } from "../data/applications";

export default function Landing() {
  const [open, setOpen] = useState(false);

  return (
    <main className={`root-portal ${open ? "is-open" : ""}`}>
      <header className="root-portal-header">
        <Link className="root-brand" to="/">
          <img src="/logo-disdik.webp" alt="Lambang Sumatera Utara" />
          <span>Portal Layanan<br /><strong>Cabang Dinas Wilayah I</strong></span>
        </Link>
        <Link className="root-login" to="/login"><LogIn size={16} /> Masuk</Link>
      </header>

      <section className="root-orbit" aria-label="Layanan aplikasi Disdik">
        <div className="root-orbit-copy">
          <span><Sparkles size={13} /> Portal layanan terpadu</span>
          <p>Arahkan cursor ke pusat untuk melihat layanan</p>
        </div>

        <div
          className="root-center-wrap"
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-controls="root-services"
          onClick={() => setOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen((value) => !value);
            }
          }}
        >
          <div className="root-center-card">
            <img src="/logo-disdik.webp" alt="Logo Sumatera Utara" />
            <strong>DISDIK</strong>
            <span>CABANG I SUMUT</span>
          </div>
          <span className="root-center-hint">Buka layanan</span>
        </div>

        <div className="root-service-list" id="root-services">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <Link className={`root-service root-service-${index + 1}`} to={`/apps/${app.id}`} key={app.id}>
                <span className="root-service-icon"><Icon size={25} /></span>
                <strong>{app.name}</strong>
                <small>{app.category}</small>
              </Link>
            );
          })}
        </div>

        <Link className="root-all-services" to="/apps">
          Lihat semua layanan <ArrowRight size={16} />
        </Link>
      </section>

      <footer className="root-portal-footer">© 2025 Cabang Dinas Pendidikan Wilayah I Sumatera Utara</footer>
    </main>
  );
}