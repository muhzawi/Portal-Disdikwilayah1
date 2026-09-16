import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import applications from "../data/applications";
import AppCard from "../components/AppCard";

function Applications() {
  const { favorites, recent } = useApp();
  const filter = new URLSearchParams(useLocation().search).get("filter");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua kategori");
  const [sort, setSort] = useState("Nama A-Z");
  const categories = [
    "Semua kategori",
    ...new Set(applications.map((app) => app.category)),
  ];
  const filtered = useMemo(
    () =>
      applications
        .filter((app) => {
          const matchesQuery = `${app.name} ${app.description}`
            .toLowerCase()
            .includes(query.toLowerCase());
          const matchesCategory =
            category === "Semua kategori" || app.category === category;
          const matchesFilter =
            filter === "favorite"
              ? favorites.includes(app.id)
              : filter === "recent"
                ? recent.includes(app.id)
                : true;
          return matchesQuery && matchesCategory && matchesFilter;
        })
        .sort((a, b) =>
          sort === "Nama Z-A"
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name),
        ),
    [query, category, sort, favorites, recent, filter],
  );
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Application hub</span>
          <h1>Semua aplikasi</h1>
          <p>Temukan layanan yang membantu pekerjaan Anda.</p>
        </div>
      </div>
      <div className="filter-bar">
        <label className="search-input">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari aplikasi..."
          />
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option>Nama A-Z</option>
          <option>Nama Z-A</option>
        </select>
      </div>
      {filtered.length ? (
        <div className="app-grid">
          {filtered.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={28} />
          <h3>Aplikasi tidak ditemukan</h3>
          <p>Coba ubah kata kunci atau filter pencarian Anda.</p>
        </div>
      )}
    </div>
  );
}

export default Applications;
