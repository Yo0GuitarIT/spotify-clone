import { PlayIcon } from "../../Icons";
import { PersonalizedCardProps } from "../../../types/types";

function PersonalizedCard({ release }: PersonalizedCardProps) {
  return (
    <button className="group relative flex flex-col h-full">
      <div className="relative w-full pt-[100%] rounded-lg overflow-hidden">
        <img
          src={release.albumCoverUrl}
          alt={release.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <PlayIcon className="size-6 text-black" />
        </div>
      </div>
      <div className="mt-4 text-left flex-grow">
        <h3 className="font-bold text-base line-clamp-1">{release.name}</h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {release.artist}
        </p>
      </div>
    </button>
  );
}

export default PersonalizedCard;
