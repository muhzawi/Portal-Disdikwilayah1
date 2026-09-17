import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="brand" to="/">
      <img className="brand-logo" src="/logo-disdik.webp" alt="" />
      <span>
        Cabdis Wilayah I
        <br />
        <strong>Provinsi Sumatera Utara</strong>
      </span>
    </Link>
  );
}