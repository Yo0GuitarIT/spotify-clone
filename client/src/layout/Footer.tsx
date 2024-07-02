import { useState } from "react";
import { PreviousIcon, PlayIcon, NextIcon, VolumeIcon } from "../component/Icons";

function Footer() {
  const [volume, setVolume] = useState(50);

  return (
    <footer className="h-[72px] w-full rounded-lg flex justify-between flex-shrink-0">
      <div className="flex-1 flex items-center gap-2">
        <img
          src="https://i.scdn.co/image/ab67616d00001e0290ceed4862375f0d68f55002"
          alt="img"
          className="rounded-sm size-14"
        />
        <div className="flex flex-col gap-[2px]">
          <p>宇多田光 </p>
          <p className="text-sm text-[#a7a7a7]">First Love</p>
        </div>
      </div>
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
      <div className="flex-1 flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <VolumeIcon className="size-6 text-[#b3b3b3] hover:text-white transition-colors" />
          <div className="w-24 group mb-2">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVolume(Number(e.target.value))
              }
              className="w-full h-1 bg-[#535353] rounded-full appearance-none cursor-pointer
           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
           [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-opacity
           [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3
           [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer
           [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:transition-opacity
           group-hover:[&::-webkit-slider-thumb]:opacity-100
           group-hover:[&::-moz-range-thumb]:opacity-100"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${volume}%, #535353 ${volume}%, #535353 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
