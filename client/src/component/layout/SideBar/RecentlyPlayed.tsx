import RecentlyPlayedHeader from "./RecentlyPlayedHeader";
import TrackList from "./TrackList";

function RecentlyPlayed() {
  return (
    <div className="rounded-lg flex-1 bg-[#181818] flex flex-col overflow-hidden">
      <RecentlyPlayedHeader />
      <TrackList />
    </div>
  );
}

export default RecentlyPlayed;
