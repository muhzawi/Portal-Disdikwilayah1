import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationDetail from "./pages/ApplicationDetail";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./App.css";

function ProtectedApp() {
  const { theme } = useApp();
  return (
    <div className={`app ${theme}`}>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apps" element={<Applications />} />
          <Route path="/apps/:id" element={<ApplicationDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ProtectedApp />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
