import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AuthCallbackPage() {
  const { handleCallback } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const processAuthCallback = (): void => {
    const params = new URLSearchParams(location.search);
    const loginState = params.get("success");

    if (loginState) {
      console.log("get login state");
      handleCallback(loginState);
      navigate("/");
    } else {
      console.error("missing login state");
      navigate("/login");
    }
  };

  useEffect(() => {
    processAuthCallback();
  }, [navigate, location, handleCallback]);

  return <div>Processing authentication...</div>;
}
export default AuthCallbackPage;
