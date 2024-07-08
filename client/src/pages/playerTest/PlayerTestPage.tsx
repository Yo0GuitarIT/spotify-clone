import { useEffect, useState } from "react";
import { getAccessToken } from "../../api/spotifyApi";
import { WebPlayBack } from "./WebPlayBack";

function PlayerTestPage() {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        setIsLoading(true);
        const data = await getAccessToken();
        if (data?.data) {
          setToken(data.data);
        } else {
          throw new Error("Failed to get access token");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Spotify Player Test Page</h1>
      {token ? (
        <WebPlayBack token={token} />
      ) : (
        <div>No token available. Please check your Spotify authentication.</div>
      )}
    </>
  );
}

export default PlayerTestPage;