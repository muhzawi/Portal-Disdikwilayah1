import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            Portal terpusat Cabang Dinas Pendidikan Wilayah I Sumatera Utara.
          </p>
        </div>
        <div>
          <span className="footer-title">Portal</span>
          <Link to="/login">Masuk</Link>
          <Link to="/#cara-kerja">Cara kerja</Link>
        </div>
        <div>
          <span className="footer-title">Bantuan</span>
          <a href="mailto:info@disdikwil1.sumutprov.go.id">Hubungi kami</a>
          <a href="#aplikasi">Layanan</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 Cabang Dinas Pendidikan Wilayah I Sumatera Utara</span>
        <span>Portal SSO • One account, everything connected.</span>
      </div>
    </footer>
  );
}

export default Footer;
