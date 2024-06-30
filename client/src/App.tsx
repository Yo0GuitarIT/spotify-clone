import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/LoginPage";

import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthPage";

function AppComponent() {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location, checkAuth]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <Login /> : <HomePage />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  )
}

export default App;
