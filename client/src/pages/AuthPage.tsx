import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleCallback } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      console.log("get access token");
      handleCallback(accessToken);
      navigate("/");
    } else {
      console.error("missing token");
      navigate("/");
    }
  }, [navigate, location, handleCallback]);

  return <div>Processing authentication...</div>;
}
export default AuthCallbackPage;
