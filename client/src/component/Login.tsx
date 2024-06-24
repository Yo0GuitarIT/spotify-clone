import { useState, useEffect } from "react";
import { login, verifyToken, logout } from "../api/auth";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const result = await verifyToken(storedToken);
          if (result.success) {
            setIsLoggedIn(true);
            setToken(storedToken);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token verification error:", error);
          localStorage.removeItem("token");
        }
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await login();
      if (result.success) {
        setIsLoggedIn(true),
          setToken(result.token),
          localStorage.setItem("token", result.token);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        const result = await logout(token);
        if (result.success) {
          setIsLoggedIn(false);
          setToken(null);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Logout error", error);
      }
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      <p>Status: {isLoggedIn ? "Logged in" : "Logged out"}</p>
      {token && <p>Token: {token}</p>}
    </>
  );
}

export default Login;
