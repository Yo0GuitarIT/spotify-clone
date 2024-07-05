interface PlaybackControlsProps {
  player: Spotify.Player;
  playbackState: Spotify.PlaybackState;
}

function PlaybackControls({ player, playbackState }: PlaybackControlsProps) {
  const isPlaying = !playbackState.paused;

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.resume();
    }
  };

  return <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>;
}

export default PlaybackControls;
