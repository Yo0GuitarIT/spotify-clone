import { PlayIcon } from "../../Icons";
function RecentlyPlayedItem() {
  return (
    <div className="bg-[#2a2a2a] rounded-md h-20 hover:bg-[#585858] group transition-colors duration-200 cursor-pointer overflow-hidden flex items-center relative">
      <img
        src="https://i.scdn.co/image/ab67616d00001e0290ceed4862375f0d68f55002"
        alt="Playlist"
        className="size-20"
      />
      <div className="ml-4 flex-grow">
        <span className="text-sm font-bold truncate">最愛...動力火車</span>
      </div>
      <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="bg-[#1ed760] rounded-full p-3 shadow-lg">
          <PlayIcon className="size-6 text-black" />
        </button>
      </div>
    </div>
  );
}

export default RecentlyPlayedItem;
