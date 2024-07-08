import { SpotifyProps } from "../../types/types";


interface TrackInfoProps {
  playbackState: SpotifyProps.PlaybackState;
}

function TrackInfo({ playbackState }: TrackInfoProps) {
  const currentTrack = playbackState.track_window.current_track;

  return (
    <div>
       {currentTrack && (
        <img 
          src={currentTrack.album.images[0].url} 
          alt={`${currentTrack.album.name} cover`} 
          style={{ width: '100px', height: '100px', marginRight: '20px' }}
        />
      )}
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
