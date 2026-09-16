import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Applications from "./pages/Applications";
import ApplicationDetail from "./pages/ApplicationDetail";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage";
import DashboardLayout from "./components/layout/DashboardLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute Dashboard */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/apps"
          element={
            <DashboardLayout>
              <Applications />
            </DashboardLayout>
          }
        />
        <Route
          path="/apps/:id"
          element={
            <DashboardLayout>
              <ApplicationDetail />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          }
        />

        {/* Fallback - harus paling bawah */}
        <Route path="*" element={<div style={{ padding: "2rem" }}>Halaman tidak ditemukan.</div>} />
      </Routes>
    </Router>
  );
}