import { SpotifyProps } from "../../types/types";

interface PlaybackControlsProps {
  player: SpotifyProps.Player;
  playbackState: SpotifyProps.PlaybackState;
}

function PlaybackControls({ player, playbackState }: PlaybackControlsProps) {
  const isPlaying = !playbackState.paused;

  const togglePlay = () => {
    isPlaying ? player.pause() : player.resume();
  };

  return <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>;
}

export default PlaybackControls;
