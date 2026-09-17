import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

const API_URL = "http://localhost:5000";

// Helper membaca data dari localStorage
function readStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

// Helper menyimpan data ke localStorage
function persist(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Gagal menyimpan ke localStorage:", error);
  }
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage("portal_user", null));
  const [favorites, setFavorites] = useState(() => readStorage("portal_favorites", []));
  const [recent, setRecent] = useState(() => readStorage("portal_recent_apps", []));
  const [theme, setTheme] = useState(() => localStorage.getItem("portal_theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Login ke backend
const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const userData = data.user || { username, name: username };
      setUser(userData);
      persist("portal_user", userData);
      if (data.token) localStorage.setItem("token", data.token);
      return { success: true, user: userData }; // tambah user di sini
    } else {
      return { success: false, message: data.message || "Login gagal, periksa username dan password!" };
    }
  } catch (error) {
    console.error("Error login:", error);
    return { success: false, message: "Gagal terhubung ke server backend!" };
  }
};

  // Register ke backend
  const register = async (namaLengkap, username, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          nama_lengkap: namaLengkap,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message };
      }
      return { success: true };
    } catch (err) {
      console.error("Error register:", err);
      return { success: false, message: "Terjadi kesalahan koneksi." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("portal_user");
    localStorage.removeItem("token");
    return { success: true };
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
        register,
        logout,
        toggleFavorite,
        addRecent,
        changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);