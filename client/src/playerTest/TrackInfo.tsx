interface TrackInfoProps {
  playbackState: Spotify.PlaybackState;
}

function TrackInfo({ playbackState }: TrackInfoProps) {
  const currentTrack = playbackState.track_window.current_track;

  return (
    <div>
      <h2>
        {currentTrack
          ? `Now Playing: ${currentTrack.name}`
          : "No track playing"}
      </h2>
      <p>
        {currentTrack
          ? `Artist: ${currentTrack.artists[0].name}`
          : "Select a track to play"}
      </p>
    </div>
  );
}

export default TrackInfo;
