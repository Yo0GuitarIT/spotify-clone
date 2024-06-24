import { useState, useEffect } from "react";
import { login } from "../api/auth";
import { LoginResponse } from "../types/types";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const result: LoginResponse = await login();
      if (result.success) {
        setIsLoggedIn(true),
          setToken(result.token),
          localStorage.setItem("token", result.token);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      <p>Status: {isLoggedIn ? "Logged in" : "Logged out"}</p>
    </>
  );
}

export default Login;
