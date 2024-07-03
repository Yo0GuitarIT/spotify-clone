import { PlayIcon } from "../../Icons";

function PersonalizedCard() {
  return (
    <button className="group relative flex flex-col h-full">
      <div className="relative w-full pt-[100%] rounded-lg overflow-hidden">
        <img
          src="https://i.scdn.co/image/ab67616d00001e0290ceed4862375f0d68f55002"
          alt="img"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <PlayIcon className="size-6 text-black" />
        </div>
      </div>
      <div className="mt-4 text-left flex-grow">
        <h3 className="font-bold text-base truncate">Daily Mix</h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          康士坦的變化球、Mary See the Future 先知瑪莉、The
          Beatles、Cream、Puddle Of Mudd
        </p>
      </div>
    </button>
  );
}

export default PersonalizedCard;