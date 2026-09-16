import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Sparkles, Layers } from "lucide-react";
import PublicNav from "../components/layout/PublicNav";
import Footer from "../components/layout/Footer";
import AppCard from "../components/cards/AppCard";
import { applications } from "../data/applications";

export default function Landing() {
  return (
    <div className="landing-page">
      <PublicNav />

      {/* Hero Section */}
      <section className="hero container">
        <div className="badge">
          <Sparkles size={14} /> Portal Layanan Terpadu
        </div>
        <h1>Satu Pintu Layanan Digital Pendidikan</h1>
        <p>
          Akses seluruh aplikasi administrasi, kepegawaian, dan akademik
          Cabang Dinas Pendidikan Wilayah I Provinsi Sumatera Utara secara
          cepat dan aman dalam satu dashboard.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/login">
            Masuk ke Portal <ArrowRight size={16} />
          </Link>
          <a className="button button-secondary" href="#aplikasi">
            Lihat Aplikasi
          </a>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="features container" id="cara-kerja">
        <div className="feature-card">
          <Shield size={24} />
          <h3>Akses Terintegrasi</h3>
          <p>Cukup satu kali login untuk mengakses seluruh layanan aplikasi.</p>
        </div>
        <div className="feature-card">
          <Zap size={24} />
          <h3>Cepat & Praktis</h3>
          <p>Navigasi antarmuka yang intuitif memudahkan pencarian data.</p>
        </div>
        <div className="feature-card">
          <Layers size={24} />
          <h3>Terorganisir</h3>
          <p>Kelola aplikasi favorit dan riwayat akses dengan mudah.</p>
        </div>
      </section>

      {/* Katalog Aplikasi */}
      <section className="apps-section container" id="aplikasi">
        <div className="section-header">
          <h2>Layanan Aplikasi</h2>
          <p>Daftar aplikasi resmi yang tersedia di lingkungan Cabdis Wilayah I.</p>
        </div>
        <div className="apps-grid">
          {applications.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}