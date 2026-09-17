import { Check, Moon, Palette, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function SettingsPage() {
  const { user, theme, changeTheme } = useApp();
  const displayName = user?.nama_lengkap || user?.username || "Pengguna";

  return (
    <div className="dashboard-content">
      <div className="page-header settings-page-header">
        <div>
          <span className="eyebrow"><Palette size={14} /> Preferensi akun</span>
          <h1>Pengaturan</h1>
          <p>Sesuaikan pengalaman portal agar nyaman digunakan setiap hari.</p>
        </div>
        <div className="settings-user-summary">
          <span className="avatar">{displayName.charAt(0).toUpperCase()}</span>
          <span><strong>{displayName}</strong><small>Pengguna portal</small></span>
        </div>
      </div>

      <div className="settings-layout">
        <section className="settings-card settings-theme-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon"><Palette size={19} /></div>
            <div><h2>Tampilan aplikasi</h2><p>Pilih tema yang paling nyaman untuk Anda.</p></div>
          </div>
          <div className="theme-options" role="radiogroup" aria-label="Tema aplikasi">
            <button type="button" className={`theme-option ${theme === "light" ? "selected" : ""}`} onClick={() => changeTheme("light")} aria-pressed={theme === "light"}>
              <span className="theme-preview light-preview"><Sun size={20} /></span>
              <span><strong>Terang</strong><small>Nuansa bersih dan cerah</small></span>
              {theme === "light" && <Check size={17} />}
            </button>
            <button type="button" className={`theme-option ${theme === "dark" ? "selected" : ""}`} onClick={() => changeTheme("dark")} aria-pressed={theme === "dark"}>
              <span className="theme-preview dark-preview"><Moon size={20} /></span>
              <span><strong>Gelap</strong><small>Lebih nyaman di ruang redup</small></span>
              {theme === "dark" && <Check size={17} />}
            </button>
          </div>
        </section>

        <aside className="settings-card settings-info-card">
          <span className="settings-info-label">Status preferensi</span>
          <strong>{theme === "dark" ? "Mode gelap aktif" : "Mode terang aktif"}</strong>
          <p>Perubahan tema tersimpan otomatis di perangkat Anda.</p>
          <div className="settings-status"><span /> Tersimpan otomatis</div>
        </aside>
      </div>
    </div>
  );
}