import { loginSpotify } from "../api/spotifyApi";
import { ApiResponse } from "../types/types";

function LoginWithSpotify() {
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

  return (
    <div>
      <button onClick={handleLoginWithSpotify}>Login with Spotify</button>
    </div>
  );
}

export default LoginWithSpotify;
