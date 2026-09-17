import { useState } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  Home,
  Grid2X2,
  Heart,
  Star,
  Settings,
  LogOut,
  X,
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Logo from "../common/Logo";

export default function DashboardLayout({ children }) {
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [search, setSearch] = useState("");

  if (!user) return <Navigate to="/login" replace />;

  const isAdmin = user?.role === "admin" || user?.role === "super_admin";

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/apps?search=${encodeURIComponent(query)}` : "/apps");
  };

  const handleLogout = () => {
    logout();
    setLogoutOpen(false);
    setProfileOpen(false);
    setOpen(false);
    navigate("/login", { replace: true });
  };

  const nav = isAdmin
    ? [
        ["/admin/dashboard", "Dashboard Admin", Home],
        ["/apps", "Aplikasi", Grid2X2],
      ]
    : [
        ["/dashboard", "Dashboard", Home],
        ["/apps", "Aplikasi", Grid2X2],
        ["/apps?filter=favorite", "Favorit", Heart],
        ["/apps?filter=recent", "Terbaru", Star],
      ];

  return (
    <div className="dashboard-shell">
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <Logo />
          <button
            className="icon-button mobile-close"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="side-nav">
          {nav.map(([path, label, Icon]) => (
            <Link
              key={label}
              className={
                location.pathname + location.search === path ? "active" : ""
              }
              to={path}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="side-bottom">
          <Link to="/settings">
            <Settings size={18} />
            Pengaturan
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {open && (
        <button
          className="mobile-overlay"
          onClick={() => setOpen(false)}
          aria-label="Tutup menu"
        />
      )}

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button
            className="icon-button menu-trigger"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
          >
            <Menu size={21} />
          </button>
          <form className="header-search" onSubmit={handleSearch}>
            <Search size={18} />
            <input
              aria-label="Cari aplikasi"
              placeholder="Cari aplikasi..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifikasi">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <button
              className="user-chip"
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              aria-expanded={profileOpen}
            >
              <span className="avatar">
                {(user.nama_lengkap || user.username || "?")[0].toUpperCase()}
              </span>{" "}
              <span>{user.nama_lengkap || user.username}</span>{" "}
              <ChevronDown size={15} />
            </button>
            {profileOpen && (
              <div className="profile-menu">
                <Link to="/profile" onClick={() => setProfileOpen(false)}>
                  Profil saya
                </Link>
                <Link to="/settings" onClick={() => setProfileOpen(false)}>
                  Pengaturan
                </Link>
                <button type="button" onClick={() => setLogoutOpen(true)}>
                  <LogOut size={15} /> Keluar
                </button>
              </div>
            )}
          </div>
        </header>
        {children}
      </div>
      {logoutOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="logout-title">
            <div className="modal-icon"><LogOut size={20} /></div>
            <h2 id="logout-title">Keluar dari portal?</h2>
            <p>Sesi Anda akan diakhiri pada perangkat ini.</p>
            <div className="modal-actions">
              <button className="button button-secondary" type="button" onClick={() => setLogoutOpen(false)}>
                Tetap masuk
              </button>
              <button className="button button-danger" type="button" onClick={handleLogout}>
                Ya, keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
