import { ExternalLink, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import applications from "../data/applications";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";

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

export default ApplicationDetail;
