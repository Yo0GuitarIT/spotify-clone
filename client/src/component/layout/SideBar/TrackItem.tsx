interface TrackItemProps {
  track: {
    albumCoverUrl: string;
    artistName: string;
    songName: string;
  };
}

function TrackItem({ track }: TrackItemProps) {
  return (
    <div className="p-2 h-16 w-full rounded-md flex items-center gap-2 transition-colors duration-200 ease-in-out hover:bg-[#282828] cursor-pointer">
      <img
        src={track.albumCoverUrl}
        alt={`${track.artistName} - ${track.songName}`}
        className="rounded size-12"
      />
      <div className="flex flex-col gap-[2px]">
        <p>{track.songName}</p>
        <p className="text-sm text-[#a7a7a7]">{track.artistName}</p>
      </div>
    </div>
  );
}

export default TrackItem;
