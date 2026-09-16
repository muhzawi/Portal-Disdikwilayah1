import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import StatusBadge from "./StatusBadge";

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

export default AppCard;
