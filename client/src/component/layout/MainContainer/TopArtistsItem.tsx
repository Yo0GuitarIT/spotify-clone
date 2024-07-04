import { PlayIcon } from "../../common/Icons";

interface TopArtitstsItemProps {
  artist: {
    name: string;
    imageUrl: string;
  };
}

function TopArtistsItem({ artist }: TopArtitstsItemProps) {
  return (
    <div className="bg-[#2a2a2a] rounded-md h-20 hover:bg-[#585858] group transition-colors duration-200 cursor-pointer overflow-hidden flex items-center relative">
      <img src={artist.imageUrl} alt={artist.name} className="size-20" />
      <div className="ml-4 flex-grow">
        <span className="text-sm font-bold truncate">{artist.name}</span>
      </div>
      <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="bg-[#1ed760] rounded-full p-3 shadow-lg">
          <PlayIcon className="size-6 text-black" />
        </button>
      </div>
    </div>
  );
}

export default TopArtistsItem;
