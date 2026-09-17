import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid2X2, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { applications } from "../data/applications";
import { useApp } from "../context/AppContext";
import AppCard from "../components/cards/AppCard";

export default function Applications() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  const { favorites, recent } = useApp();

  const [search, setSearch] = useState(searchParams.get("search") || "");
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

  const hasFilters = Boolean(search.trim()) || selectedCategory !== "all";
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
  };

  return (
    <div className="dashboard-content">
      <div className="page-header apps-page-header">
        <div>
          <span className="eyebrow page-kicker"><Grid2X2 size={14} /> Portal layanan</span>
          <h1>
            {filterParam === "favorite"
              ? "Aplikasi Favorit"
              : filterParam === "recent"
              ? "Baru Saja Dibuka"
              : "Katalog Aplikasi"}
          </h1>
          <p>Temukan layanan yang Anda perlukan dan akses dari satu tempat.</p>
        </div>
        <div className="apps-page-count">
          <strong>{filteredApps.length}</strong>
          <span>layanan ditemukan</span>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-heading"><SlidersHorizontal size={17} /><span>Jelajahi layanan</span></div>
        <div className="search-box">
          <Search size={18} />
          <input
            aria-label="Cari aplikasi"
            type="text"
            placeholder="Cari nama atau deskripsi aplikasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <button type="button" className="clear-search" onClick={() => setSearch("")} aria-label="Hapus pencarian"><X size={15} /></button>}
        </div>

        <div className="category-pills" aria-label="Filter kategori">
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
        {hasFilters && <button type="button" className="reset-filter" onClick={resetFilters}><RotateCcw size={14} /> Reset filter</button>}
      </div>

      {filteredApps.length ? (
        <div className="apps-grid">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon"><Search size={22} /></div>
          <h3>Layanan tidak ditemukan</h3>
          <p>Coba gunakan kata kunci lain atau reset filter kategori.</p>
          {hasFilters && <button type="button" className="button button-secondary" onClick={resetFilters}>Tampilkan semua layanan</button>}
        </div>
      )}
    </div>
  );
}