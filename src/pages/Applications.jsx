import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { applications } from "../data/applications";
import { useApp } from "../context/AppContext";
import AppCard from "../components/cards/AppCard";

export default function Applications() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  const { favorites, recent } = useApp();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    ...new Set(applications.map((app) => app.category)),
  ];

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || app.category === selectedCategory;

    if (filterParam === "favorite") {
      return matchesSearch && matchesCategory && favorites.includes(app.id);
    }
    if (filterParam === "recent") {
      return matchesSearch && matchesCategory && recent.includes(app.id);
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>
          {filterParam === "favorite"
            ? "Aplikasi Favorit"
            : filterParam === "recent"
            ? "Baru Saja Dibuka"
            : "Katalog Aplikasi"}
        </h1>
        <p>Temukan dan kelola seluruh aplikasi yang tersedia.</p>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Cari nama atau deskripsi aplikasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "Semua" : cat}
            </button>
          ))}
        </div>
      </div>

      {filteredApps.length ? (
        <div className="apps-grid">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Tidak ada aplikasi yang sesuai dengan pencarian Anda.</p>
        </div>
      )}
    </div>
  );
}