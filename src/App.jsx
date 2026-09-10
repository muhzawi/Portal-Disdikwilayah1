import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  FileText,
  Grid2X2,
  Heart,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";

const applications = [
  {
    id: "e-arsip",
    name: "E-Arsip",
    category: "Administrasi",
    description: "Kelola arsip digital secara aman dan terstruktur.",
    icon: FileText,
    status: "available",
    version: "1.0.0",
    url: "https://example.com/e-arsip",
  },
  {
    id: "akademik",
    name: "Akademik",
    category: "Pendidikan",
    description: "Akses informasi akademik dalam satu dashboard.",
    icon: BookOpen,
    status: "available",
    version: "2.4.1",
    url: "https://example.com/akademik",
  },
  {
    id: "inventaris",
    name: "Inventaris",
    category: "Administrasi",
    description: "Pantau aset dan inventaris sekolah dengan mudah.",
    icon: ClipboardList,
    status: "maintenance",
    version: "1.8.0",
    url: "https://example.com/inventaris",
  },
  {
    id: "kepegawaian",
    name: "Kepegawaian",
    category: "Kepegawaian",
    description: "Informasi data dan layanan kepegawaian.",
    icon: ShieldCheck,
    status: "available",
    version: "1.2.0",
    url: "https://example.com/kepegawaian",
  },
];

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function AppProvider({ children }) {
  const [user, setUser] = useState(() => readStorage("portal_user", null));
  const [favorites, setFavorites] = useState(() =>
    readStorage("portal_favorites", []),
  );
  const [recent, setRecent] = useState(() =>
    readStorage("portal_recent_apps", []),
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem("portal_theme") || "light",
  );

  const persist = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));
  const login = (email) => {
    const nextUser = { name: email.split("@")[0] || "Pengguna", email };
    setUser(nextUser);
    persist("portal_user", nextUser);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("portal_user");
  };
  const toggleFavorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    setFavorites(next);
    persist("portal_favorites", next);
  };
  const addRecent = (id) => {
    const next = [id, ...recent.filter((item) => item !== id)].slice(0, 4);
    setRecent(next);
    persist("portal_recent_apps", next);
  };
  const changeTheme = (next) => {
    setTheme(next);
    localStorage.setItem("portal_theme", next);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        favorites,
        recent,
        theme,
        login,
        logout,
        toggleFavorite,
        addRecent,
        changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

import { createContext, useContext } from "react";
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

function Logo() {
  return (
    <Link className="brand" to="/">
      <img className="brand-logo" src="/logo-disdik.webp" alt="" />
      <span>
        Cabang Dinas Pendidikan
        <br />
        <strong>Wilayah 1 Sumatera Utara</strong>
      </span>
    </Link>
  );
}

function Button({ children, variant = "primary", ...props }) {
  return (
    <button className={`button button-${variant}`} {...props}>
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const labels = {
    available: "Tersedia",
    maintenance: "Pemeliharaan",
    offline: "Offline",
  };
  return (
    <span className={`status status-${status}`}>
      <span />
      {labels[status]}
    </span>
  );
}

function AppCard({ app }) {
  const { favorites, toggleFavorite, addRecent } = useApp();
  const Icon = app.icon;
  return (
    <article className="app-card">
      <div className="app-card-top">
        <div className="app-icon">
          <Icon size={22} />
        </div>
        <button
          className={`icon-button ${favorites.includes(app.id) ? "is-favorite" : ""}`}
          aria-label={`${favorites.includes(app.id) ? "Hapus" : "Tambah"} ${app.name} dari favorit`}
          onClick={() => toggleFavorite(app.id)}
        >
          <Star
            size={18}
            fill={favorites.includes(app.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="app-card-content">
        <span className="eyebrow">{app.category}</span>
        <h3>{app.name}</h3>
        <p>{app.description}</p>
        <StatusBadge status={app.status} />
      </div>
      <Link
        className={`card-action ${app.status !== "available" ? "disabled" : ""}`}
        to={`/apps/${app.id}`}
        onClick={() => app.status === "available" && addRecent(app.id)}
      >
        Buka aplikasi <ArrowRight size={16} />
      </Link>
    </article>
  );
}

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
              Portal terpusat Cabang Dinas Pendidikan Wilayah 1 Sumatera Utara
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

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            Portal terpusat Cabang Dinas Pendidikan Wilayah 1 Sumatera Utara.
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
        <span>© 2025 Cabang Dinas Pendidikan Wilayah 1 Sumatera Utara</span>
        <span>Portal SSO • One account, everything connected.</span>
      </div>
    </footer>
  );
}

function Login() {
  const { user, login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("pegawai@disdikwil1.go.id");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  if (user) return <Navigate to="/dashboard" replace />;
  const submit = (event) => {
    event.preventDefault();
    if (!email || !password) return setError("Email dan password wajib diisi.");
    login(email);
    navigate("/dashboard");
  };
  return (
    <div className="auth-page">
      <div className="auth-aside">
        <Logo />
        <div>
          <span className="pill">PORTAL SSO</span>
          <h1>
            Semua layanan,
            <br />
            <em>satu akses.</em>
          </h1>
          <p>
            Kelola aktivitas layanan pendidikan Anda melalui portal terpusat
            yang aman dan mudah digunakan.
          </p>
        </div>
        <span className="auth-aside-footer">
          © 2025 Disdik Wilayah 1 Sumatera Utara
        </span>
      </div>
      <main className="auth-main">
        <div className="auth-form">
          <Link className="back-link" to="/">
            <ArrowRight size={16} className="back-icon" /> Kembali ke beranda
          </Link>
          <span className="eyebrow">Selamat datang kembali</span>
          <h2>Masuk ke portal</h2>
          <p className="form-intro">
            Gunakan akun organisasi Anda untuk melanjutkan.
          </p>
          <form onSubmit={submit}>
            <label>
              Email organisasi
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@instansi.go.id"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="form-row">
              <label className="check">
                <input type="checkbox" defaultChecked /> Ingat saya
              </label>
              <a href="#forgot">Lupa password?</a>
            </div>
            {error && <div className="form-error">{error}</div>}
            <Button type="submit">
              Masuk ke portal <ArrowRight size={17} />
            </Button>
          </form>
          <p className="auth-note">
            Dengan masuk, Anda menyetujui ketentuan penggunaan portal.
          </p>
        </div>
      </main>
    </div>
  );
}

function DashboardLayout({ children }) {
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  if (!user) return <Navigate to="/login" replace />;
  const nav = [
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
          <div className="header-search">
            <Search size={18} />
            <input placeholder="Cari aplikasi..." />
          </div>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifikasi">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <Link className="user-chip" to="/profile">
              <span className="avatar">{user.name[0].toUpperCase()}</span>
              <span>{user.name}</span>
              <ChevronDown size={15} />
            </Link>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
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

function ClockIcon() {
  return <span className="empty-clock">◷</span>;
}

function Applications() {
  const { favorites, recent } = useApp();
  const filter = new URLSearchParams(useLocation().search).get("filter");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua kategori");
  const [sort, setSort] = useState("Nama A-Z");
  const categories = [
    "Semua kategori",
    ...new Set(applications.map((app) => app.category)),
  ];
  const filtered = useMemo(
    () =>
      applications
        .filter((app) => {
          const matchesQuery = `${app.name} ${app.description}`
            .toLowerCase()
            .includes(query.toLowerCase());
          const matchesCategory =
            category === "Semua kategori" || app.category === category;
          const matchesFilter =
            filter === "favorite"
              ? favorites.includes(app.id)
              : filter === "recent"
                ? recent.includes(app.id)
                : true;
          return matchesQuery && matchesCategory && matchesFilter;
        })
        .sort((a, b) =>
          sort === "Nama Z-A"
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name),
        ),
    [query, category, sort, favorites, recent, filter],
  );
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Application hub</span>
          <h1>Semua aplikasi</h1>
          <p>Temukan layanan yang membantu pekerjaan Anda.</p>
        </div>
      </div>
      <div className="filter-bar">
        <label className="search-input">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari aplikasi..."
          />
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option>Nama A-Z</option>
          <option>Nama Z-A</option>
        </select>
      </div>
      {filtered.length ? (
        <div className="app-grid">
          {filtered.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={28} />
          <h3>Aplikasi tidak ditemukan</h3>
          <p>Coba ubah kata kunci atau filter pencarian Anda.</p>
        </div>
      )}
    </div>
  );
}

function ApplicationDetail() {
  const { id } = useParams();
  const app = applications.find((item) => item.id === id);
  const { favorites, toggleFavorite, addRecent } = useApp();
  if (!app)
    return (
      <div className="page-content">
        <div className="empty-state">
          <h2>Aplikasi tidak ditemukan</h2>
          <Link className="text-link" to="/apps">
            Kembali ke aplikasi
          </Link>
        </div>
      </div>
    );
  const Icon = app.icon;
  return (
    <div className="page-content detail-page">
      <Link className="back-link" to="/apps">
        ← Kembali ke aplikasi
      </Link>
      <div className="detail-card">
        <div className="detail-icon">
          <Icon size={34} />
        </div>
        <span className="eyebrow">{app.category}</span>
        <h1>{app.name}</h1>
        <p className="detail-description">{app.description}</p>
        <StatusBadge status={app.status} />
        <div className="detail-meta">
          <span>
            <strong>Versi</strong>
            {app.version}
          </span>
          <span>
            <strong>Status layanan</strong>
            {app.status === "available"
              ? "Beroperasi normal"
              : "Dalam pemeliharaan"}
          </span>
        </div>
        <div className="detail-actions">
          <Button
            disabled={app.status !== "available"}
            onClick={() => {
              addRecent(app.id);
              window.open(app.url, "_blank", "noopener,noreferrer");
            }}
          >
            Buka aplikasi <ExternalLink size={17} />
          </Button>
          <button
            className={`button button-secondary ${favorites.includes(app.id) ? "selected" : ""}`}
            onClick={() => toggleFavorite(app.id)}
          >
            <Heart
              size={17}
              fill={favorites.includes(app.id) ? "currentColor" : "none"}
            />
            {favorites.includes(app.id) ? "Favorit" : "Tambah favorit"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const { user } = useApp();
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Akun</span>
          <h1>Profil pengguna</h1>
          <p>Kelola informasi dasar akun Anda.</p>
        </div>
      </div>
      <div className="settings-card profile-card">
        <div className="profile-avatar">{user.name[0].toUpperCase()}</div>
        <div className="profile-info">
          <span className="eyebrow">Nama lengkap</span>
          <h2>{user.name}</h2>
          <span className="eyebrow">Email organisasi</span>
          <p>{user.email}</p>
        </div>
        <Button variant="secondary">Edit profil</Button>
      </div>
    </div>
  );
}

function SettingsPage() {
  const { theme, changeTheme } = useApp();
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Preferensi</span>
          <h1>Pengaturan</h1>
          <p>Sesuaikan pengalaman Anda di portal.</p>
        </div>
      </div>
      <div className="settings-card">
        <div className="setting-row">
          <div>
            <h3>Tampilan portal</h3>
            <p>Pilih tema yang nyaman untuk Anda gunakan.</p>
          </div>
          <div className="theme-switcher">
            <button
              className={theme === "light" ? "selected" : ""}
              onClick={() => changeTheme("light")}
            >
              Terang
            </button>
            <button
              className={theme === "dark" ? "selected" : ""}
              onClick={() => changeTheme("dark")}
            >
              Gelap
            </button>
          </div>
        </div>
        <div className="setting-row">
          <div>
            <h3>Notifikasi</h3>
            <p>Dapatkan informasi terbaru tentang layanan portal.</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span />
          </label>
        </div>
      </div>
    </div>
  );
}

function ProtectedApp() {
  const { theme } = useApp();
  return (
    <div className={`app ${theme}`}>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apps" element={<Applications />} />
          <Route path="/apps/:id" element={<ApplicationDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ProtectedApp />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
