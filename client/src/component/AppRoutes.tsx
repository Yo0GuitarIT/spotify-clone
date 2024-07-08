import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AuthCallbackPage from "../pages/AuthCallbackPage";
import PlayerTestPage from "../pages/playerTest/PlayerTestPage";

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      <Route
        path="/test"
        element={
          isAuthenticated ? <PlayerTestPage /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
