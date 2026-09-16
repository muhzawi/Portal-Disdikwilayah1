import { useApp } from "../context/AppContext";

export default function SettingsPage() {
  const { theme, changeTheme } = useApp();

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Pengaturan</h1>
        <p>Atur preferensi tampilan dan aplikasi Anda.</p>
      </div>

      <div className="settings-card">
        <h3>Tampilan Aplikasi</h3>
        <div className="setting-item">
          <div>
            <strong>Tema Warna</strong>
            <p>Pilih mode tampilan interface yang nyaman di mata.</p>
          </div>
          <select
            value={theme}
            onChange={(e) => changeTheme(e.target.value)}
            className="select-input"
          >
            <option value="light">Terang (Light)</option>
            <option value="dark">Gelap (Dark)</option>
          </select>
        </div>
      </div>
    </div>
  );
}