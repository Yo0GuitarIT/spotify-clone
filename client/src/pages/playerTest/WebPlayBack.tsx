import { useCallback } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import SpotifyPlayer from "./SpotifyPlayer";

interface WebPlayBackProps {
  token: string;
}

export const WebPlayBack: React.FC<WebPlayBackProps> = ({ token }) => {
  const getOAuthToken = useCallback(
    (callback: any) => callback(token),
    [token]
  );

  return (
    <WebPlaybackSDK
      initialDeviceName="My Spotify Web Player"
      getOAuthToken={getOAuthToken}
      initialVolume={0.8}
      connectOnInitialized={true}
    >
      <SpotifyPlayer token={token} />
    </WebPlaybackSDK>
  );
};
