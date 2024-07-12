import { PlayIcon } from "../../common/Icons";

interface TopArtitstsItemProps {
  artist: {
    artistName: string;
    imageUrl: string;
  };
}

function TopArtistsItem({ artist }: TopArtitstsItemProps) {
  return (
    <div className="bg-[#2a2a2a] rounded-md h-20 hover:bg-[#585858] group transition-colors duration-200 cursor-pointer overflow-hidden flex items-center relative">
      <img src={artist.imageUrl} alt={artist.artistName} className="size-20" />
      <div className="flex-grow ml-4">
        <span className="text-sm font-bold truncate">{artist.artistName}</span>
      </div>
      <div className="absolute transition-opacity duration-200 opacity-0 right-2 group-hover:opacity-100">
        <button className="bg-[#1ed760] rounded-full p-3 shadow-lg">
          <PlayIcon className="text-black size-6" />
        </button>
      </div>
    </div>
  );
}

export default TopArtistsItem;
