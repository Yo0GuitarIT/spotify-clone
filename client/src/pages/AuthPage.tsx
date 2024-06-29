import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleCallback } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const loginState = params.get("login_success");

    if (loginState) {
      console.log("get login state");
      handleCallback(loginState);
      navigate("/");
    } else {
      console.error("missing login state");
      navigate("/");
    }
  }, [navigate, location, handleCallback]);

  return <div>Processing authentication...</div>;
}
export default AuthCallbackPage;
