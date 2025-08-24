// src/App.jsx
import React from "react";
import { HiringProvider } from "./contexts/HiringContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Toast from "./components/toast";

function AppContent() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {user ? <Dashboard /> : <LoginPage />}
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <HiringProvider>
        <AppContent />
      </HiringProvider>
    </AuthProvider>
  );
}

export default App;
