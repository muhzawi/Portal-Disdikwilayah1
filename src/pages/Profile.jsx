import { useApp } from "../context/AppContext";

export default function Profile() {
  const { user } = useApp();

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Profil Pengguna</h1>
        <p>Informasi akun portal terpadu Anda.</p>
      </div>

      <div className="profile-card">
        <div className="avatar-large">{user.name[0].toUpperCase()}</div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <span className="role-badge">Pegawai / Staf Dinas</span>
        </div>
      </div>
    </div>
  );
}