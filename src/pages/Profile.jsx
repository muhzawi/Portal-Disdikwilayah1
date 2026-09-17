import { useApp } from "../context/AppContext";

export default function Profile() {
  const { user } = useApp();
  const displayName = user?.nama_lengkap || user?.name || user?.username || "Pengguna";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Profil Pengguna</h1>
        <p>Informasi akun portal terpadu Anda.</p>
      </div>

      <div className="profile-card">
        <div className="avatar-large">{initial}</div>
        <div className="profile-info">
          <h2>{displayName}</h2>
          <p className="profile-email">@{user?.username || "akun-portal"}</p>
          <span className="role-badge">{user?.role === "super_admin" ? "Super Admin" : user?.role === "admin" ? "Admin" : "Pegawai / Staf Dinas"}</span>
        </div>
      </div>
    </div>
  );
}