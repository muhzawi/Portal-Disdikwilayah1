import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Star } from "lucide-react";
import { applications } from "../data/applications";
import { useApp } from "../context/AppContext";
import StatusBadge from "../components/common/StatusBadge";

export default function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addRecent } = useApp();

  const app = applications.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="dashboard-content">
        <div className="empty-state">
          <h2>Aplikasi tidak ditemukan</h2>
          <button className="button button-primary" onClick={() => navigate("/apps")}>
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  const Icon = app.icon;
  const isFav = favorites.includes(app.id);

  const handleOpenApp = () => {
    addRecent(app.id);
    window.open(app.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="dashboard-content">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Kembali
      </button>

      <div className="app-detail-card">
        <div className="detail-header">
          <div className="detail-title-group">
            <div className="app-icon large">
              <Icon size={32} />
            </div>
            <div>
              <span className="eyebrow">{app.category}</span>
              <h1>{app.name}</h1>
              <span className="version">Versi {app.version}</span>
            </div>
          </div>

          <button
            className={`icon-button ${isFav ? "is-favorite" : ""}`}
            onClick={() => toggleFavorite(app.id)}
          >
            <Star size={20} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="detail-body">
          <h3>Deskripsi Aplikasi</h3>
          <p>{app.description}</p>

          <div className="status-row">
            <span>Status Layanan:</span>
            <StatusBadge status={app.status} />
          </div>
        </div>

        <div className="detail-footer">
          <button
            className="button button-primary"
            disabled={app.status !== "available"}
            onClick={handleOpenApp}
          >
            Buka Aplikasi <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}