import { useEffect } from "react";
import {
  useWebPlaybackSDKReady,
  useSpotifyPlayer,
  usePlaybackState,
  usePlayerDevice,
} from "react-spotify-web-playback-sdk";
import TrackInfo from "./TrackInfo";
import PlaybackControls from "./PlaybackControls";
import { connectToSpotify } from "../../utils/spotifyUtils";


function SpotifyPlayer({ token }: { token: string }) {
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const player = useSpotifyPlayer();
  const playbackState = usePlaybackState();
  const device = usePlayerDevice();

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
