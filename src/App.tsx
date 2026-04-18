import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DemoApp from "./components/DemoApp";
import ProfilePage from "./pages/settings/ProfilePage";
import AccountPage from "./pages/settings/AccountPage";
import PracticePage from "./pages/settings/PracticePage";
import NotificationsPage from "./pages/settings/NotificationsPage";

// Simple Mock Auth Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, you'd check a token or context here
  const isAuthenticated = localStorage.getItem("demo_auth") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function AppContent() {
  const navigate = useNavigate();

  const handleStartDemo = () => {
    localStorage.setItem("demo_auth", "true");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("demo_auth");
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onStartDemo={handleStartDemo} />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/practice" element={<PracticePage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <DemoApp onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </Router>
  );
}
