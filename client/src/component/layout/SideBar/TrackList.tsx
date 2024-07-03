import TrackItem from "./TrackItem";
import { useUserRecentltPlayedTrack } from "../../../hooks/useUserRecentlyPlayedTracks";

function TrackList() {
  const { tracks } = useUserRecentltPlayedTrack();
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {tracks.map((track, index) => (
        <TrackItem key={index} track={track} />
      ))}
    </div>
  );
}

export default TrackList;
