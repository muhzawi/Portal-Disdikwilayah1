import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Grid2X2, Settings2, ShieldCheck, Users, Wrench } from "lucide-react";
import { useApp } from "../context/AppContext";
import { applications } from "../data/applications";
import StatusBadge from "../components/common/StatusBadge";

export default function AdminDashboard() {
  const { user } = useApp();

  const isAdmin = user?.role === "admin" || user?.role === "super_admin";
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  const availableApps = applications.filter((app) => app.status === "available");
  const maintenanceApps = applications.filter((app) => app.status === "maintenance");

  return (
    <div className="dashboard-page container">
      <div className="page-header">
        <div className="admin-header-row">
          <h1>Dashboard Admin</h1>
          <span className="role-pill">
            {user.role === "super_admin" ? "Super Admin" : "Admin"}
          </span>
        </div>
        <p>Halo, {user?.nama_lengkap || user?.username}. Pantau kesehatan layanan portal dari satu tempat.</p>
      </div>

      {/* Statistik placeholder */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-blue">
            <Users size={20} />
          </div>
          <div>
            <span className="stat-value">—</span>
            <span className="stat-label">Total Pengguna</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-green">
            <Grid2X2 size={20} />
          </div>
          <div>
            <span className="stat-value">{availableApps.length}</span>
            <span className="stat-label">Aplikasi Aktif</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-yellow">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="stat-value">{maintenanceApps.length}</span>
            <span className="stat-label">Menunggu Persetujuan</span>
          </div>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="admin-section-heading">
          <div>
            <span className="eyebrow">Operasional</span>
            <h2>Kontrol cepat</h2>
          </div>
          <span className="live-indicator"><span /> Sistem aktif</span>
        </div>
        <div className="admin-quick-grid">
          <Link className="admin-quick-card" to="/apps">
            <span className="admin-quick-icon blue"><Grid2X2 size={20} /></span>
            <span><strong>Kelola katalog</strong><small>Periksa seluruh aplikasi</small></span>
            <ArrowRight size={17} />
          </Link>
          <Link className="admin-quick-card" to="/settings">
            <span className="admin-quick-icon green"><Settings2 size={20} /></span>
            <span><strong>Preferensi portal</strong><small>Atur tampilan dashboard</small></span>
            <ArrowRight size={17} />
          </Link>
          <div className="admin-quick-card muted">
            <span className="admin-quick-icon amber"><Users size={20} /></span>
            <span><strong>Manajemen pengguna</strong><small>Menunggu endpoint backend</small></span>
            <Wrench size={17} />
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header-row">
          <div>
            <h2>Status layanan</h2>
            <p className="section-caption">Ringkasan kondisi aplikasi portal saat ini.</p>
          </div>
          <Link className="link-more" to="/apps">Lihat katalog <ArrowRight size={14} /></Link>
        </div>
        <div className="admin-service-list">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <div className="admin-service-row" key={app.id}>
                <div className="admin-service-icon"><Icon size={18} /></div>
                <div className="admin-service-name"><strong>{app.name}</strong><span>{app.category}</span></div>
                <StatusBadge status={app.status} />
                {app.status === "available" ? <CheckCircle2 className="service-check" size={18} /> : <Wrench className="service-wrench" size={18} />}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}