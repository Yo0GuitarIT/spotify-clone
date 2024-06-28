import { loginSpotify } from "../api/spotifyApi";
import { ApiResponse } from "../types/types";
import { useAuth } from "../useAuth";

function LoginWithSpotify() {
  const { isAuthenticated, isLoading } = useAuth();

  const handleLoginWithSpotify = async (): Promise<void> => {
    try {
      const data: ApiResponse = await loginSpotify();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Login failed or URL not provided.");
      }
    } catch (error) {
      console.error("Error during Spotify login:", error);
    }
  };

  const handleLogoutWithSpotify = () => {
    localStorage.removeItem("spotify_access_token");
    window.location.reload();
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <p>You are logged in</p>
          <button onClick={handleLogoutWithSpotify}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please Log in</p>
          <button onClick={handleLoginWithSpotify}>Login with Spotify</button>
        </div>
      )}
    </>
  );
}

export default LoginWithSpotify;
