import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import applications from "../data/applications";
import AppCard from "../components/AppCard";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

function PublicNav() {
  return (
    <header className="public-nav container">
      <Logo />
      <nav>
        <Link to="/#cara-kerja">Cara kerja</Link>
        <Link to="/#aplikasi">Aplikasi</Link>
        <Link to="/login">Masuk</Link>
      </nav>
      <Link className="button button-primary nav-cta" to="/login">
        Mulai sekarang <ArrowRight size={16} />
      </Link>
    </header>
  );
}

function Landing() {
  return (
    <div className="landing">
      <PublicNav />
      <main>
        <section className="hero container">
          <div className="hero-copy">
            <span className="pill">
              <span className="pill-dot" /> Portal resmi layanan pendidikan
            </span>
            <h1>
              Satu akun untuk <em>semua layanan</em> pendidikan.
            </h1>
            <p>
              Portal terpusat Cabang Dinas Pendidikan Wilayah I Sumatera Utara
              untuk menemukan dan mengakses aplikasi kerja dengan lebih cepat.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/login">
                Masuk ke portal <ArrowRight size={17} />
              </Link>
              <a className="text-link" href="#cara-kerja">
                Pelajari lebih lanjut <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-card art-main">
              <div className="art-header">
                <span className="brand-mark small">1</span>
                <span />
                <span />
                <span />
              </div>
              <span className="art-label">Aplikasi saya</span>
              <strong>
                Semua kebutuhan,
                <br />
                dalam satu tempat.
              </strong>
              <div className="art-apps">
                {applications.slice(0, 3).map((app) => (
                  <div key={app.id}>
                    <app.icon size={17} />
                    <span>{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="art-float float-top">
              <Star size={16} fill="currentColor" /> Akses lebih mudah
            </div>
            <div className="art-float float-bottom">
              <ShieldCheck size={17} /> Aman & terpusat
            </div>
          </div>
        </section>
        <section className="trust-strip"></section>
        <section className="steps section container" id="cara-kerja">
          <div className="section-heading centered">
            <span className="eyebrow">Cara kerja</span>
            <h2>Mulai bekerja dalam tiga langkah.</h2>
            <p>
              Semua yang Anda butuhkan untuk mengakses layanan pendidikan, tanpa
              berpindah-pindah tempat.
            </p>
          </div>
          <div className="step-grid">
            {[
              [
                "01",
                "Masuk sekali",
                "Gunakan akun Anda untuk masuk ke portal dengan aman.",
              ],
              [
                "02",
                "Temukan aplikasi",
                "Cari aplikasi yang Anda perlukan dari katalog terpusat.",
              ],
              [
                "03",
                "Mulai bekerja",
                "Buka layanan dan lanjutkan pekerjaan Anda dengan cepat.",
              ],
            ].map(([number, title, text]) => (
              <div className="step" key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="featured section container" id="aplikasi">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Aplikasi unggulan</span>
              <h2>Layanan dalam genggaman.</h2>
            </div>
            <Link className="text-link" to="/login">
              Lihat semua aplikasi <ArrowRight size={16} />
            </Link>
          </div>
          <div className="featured-grid">
            {applications.slice(0, 3).map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
