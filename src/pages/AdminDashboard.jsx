import { Navigate } from "react-router-dom";
import { Users, Grid2X2, ShieldCheck, Settings2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AdminDashboard() {
  const { user } = useApp();

  const isAdmin = user?.role === "admin" || user?.role === "super_admin";
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div className="dashboard-page container">
      <div className="page-header">
        <div className="admin-header-row">
          <h1>Dashboard Admin</h1>
          <span className="role-pill">
            {user.role === "super_admin" ? "Super Admin" : "Admin"}
          </span>
        </div>
        <p>
          Halo, {user?.nama_lengkap || user?.username}. Panel ini untuk
          mengelola pengguna dan aplikasi portal.
        </p>
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
            <span className="stat-value">—</span>
            <span className="stat-label">Aplikasi Aktif</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-yellow">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="stat-value">—</span>
            <span className="stat-label">Menunggu Persetujuan</span>
          </div>
        </div>
      </div>

      {/* Kelola Pengguna */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <h2>Kelola Pengguna</h2>
        </div>
        <div className="admin-panel-card">
          <div className="admin-panel-icon">
            <Users size={26} />
          </div>
          <div className="admin-panel-content">
            <h3>Daftar pengguna belum tersedia</h3>
            <p>
              Fitur untuk melihat, mengubah role, dan menghapus pengguna akan
              muncul di sini setelah endpoint data pengguna dibuat.
            </p>
          </div>
          <span className="status status-maintenance">Segera hadir</span>
        </div>
      </section>

      {/* Kelola Aplikasi */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <h2>Kelola Aplikasi</h2>
        </div>
        <div className="admin-panel-card">
          <div className="admin-panel-icon">
            <Settings2 size={26} />
          </div>
          <div className="admin-panel-content">
            <h3>Pengaturan aplikasi belum tersedia</h3>
            <p>
              Tambah, ubah status, atau nonaktifkan aplikasi portal akan bisa
              dilakukan dari sini.
            </p>
          </div>
          <span className="status status-maintenance">Segera hadir</span>
        </div>
      </section>
    </div>
  );
}