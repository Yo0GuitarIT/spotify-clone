import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      console.log("get access token");
      localStorage.setItem("spotify_access_token", accessToken);
      navigate("/");
    } else {
      console.error("missing token");
    }
  }, [navigate, location]);

  return <div>Processing authentication...</div>;
}
export default AuthCallbackPage;
