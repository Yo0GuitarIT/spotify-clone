import { PlayIcon } from "../../common/Icons";

interface PersonalizedCardProps {
  item: any;
  type: "track" | "album";
}

function PersonalizedCard({ item, type }: PersonalizedCardProps) {
  const imageUrl = item.albumCoverUrl;
  const artistName = item.artistName;
  const title = (type === 'track' ? item.songName : item.albumName);

  return (
    <button className="group relative flex flex-col h-full">
      <div className="relative w-full pt-[100%] rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={artistName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <PlayIcon className="size-6 text-black" />
        </div>
      </div>
      <div className="mt-4 text-left flex-grow">
        <h3 className="font-bold text-base line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{artistName}</p>
      </div>
    </button>
  );
}

export default PersonalizedCard;
