import { useEffect } from "react";
import {
  useWebPlaybackSDKReady,
  useSpotifyPlayer,
  usePlaybackState,
  usePlayerDevice,
} from "react-spotify-web-playback-sdk";
import TrackInfo from "./TrackInfo";
import PlaybackControls from "./PlaybackControls";

function SpotifyPlayer({ token }: { token: string }) {
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const player = useSpotifyPlayer();
  const playbackState = usePlaybackState();
  const device = usePlayerDevice();

  const connectToSpotify = (token: string, deviceId: string) => {
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: false,
      }),
    }).catch((error) => console.error("Error connecting to player:", error));
  };

  useEffect(() => {
    if (webPlaybackSDKReady && device?.device_id) {
      connectToSpotify(token, device.device_id);
    }
  }, [device, token, webPlaybackSDKReady]);

  if (!webPlaybackSDKReady)
    return <div>Loading Spotify Web Playback SDK...</div>;
  if (!player || !playbackState) return <div>Connecting to Spotify...</div>;

  return (
    <div>
      <TrackInfo playbackState={playbackState} />
      <PlaybackControls player={player} playbackState={playbackState} />
    </div>
  );
}

export default SpotifyPlayer;
