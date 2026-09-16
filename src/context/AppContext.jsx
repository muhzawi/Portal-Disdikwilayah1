import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => readStorage("portal_user", null));
  const [favorites, setFavorites] = useState(() =>
    readStorage("portal_favorites", []),
  );
  const [recent, setRecent] = useState(() =>
    readStorage("portal_recent_apps", []),
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem("portal_theme") || "light",
  );

  const persist = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));
  const login = (email) => {
    const nextUser = { name: email.split("@")[0] || "Pengguna", email };
    setUser(nextUser);
    persist("portal_user", nextUser);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("portal_user");
  };
  const toggleFavorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    setFavorites(next);
    persist("portal_favorites", next);
  };
  const addRecent = (id) => {
    const next = [id, ...recent.filter((item) => item !== id)].slice(0, 4);
    setRecent(next);
    persist("portal_recent_apps", next);
  };
  const changeTheme = (next) => {
    setTheme(next);
    localStorage.setItem("portal_theme", next);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        favorites,
        recent,
        theme,
        login,
        logout,
        toggleFavorite,
        addRecent,
        changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
