import { usePlayer } from "../../../hooks/usePlayer";

function NowPlaying() {
  const { currentTrack } = usePlayer();

  return (
    <div className="flex-1 flex items-center gap-2">
      <img
        src={currentTrack?.album.images[0]?.url}
        alt={`${currentTrack?.name} album cover`}
        className="rounded-sm size-14"
      />
      <div className="flex flex-col gap-[2px]">
        <p>{currentTrack?.name}</p>
        <p className="text-sm text-[#a7a7a7]">
          {" "}
          {currentTrack?.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default NowPlaying;
