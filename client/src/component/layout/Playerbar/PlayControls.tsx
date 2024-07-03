import { PreviousIcon, PlayIcon, NextIcon } from "../../Icons";

function Playcontrols() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <button className="size-8 flex items-center justify-center  hover:text-[#1DB954] transition-colors">
        <PreviousIcon className="size-6 text-gray-500" />
      </button>
      <button className="size-12 bg-[#1DB954] rounded-full mx-4 flex items-center justify-center hover:scale-105 transition-transform">
        <PlayIcon className="size-6 text-black" />
      </button>
      <button className="size-8 flex items-center justify-center  hover:text-[#1DB954] transition-colors">
        <NextIcon className="size-6 text-gray-500" />
      </button>
    </div>
  );
}

export default Playcontrols;
