import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Logo from "../common/Logo";

export default function PublicNav() {
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