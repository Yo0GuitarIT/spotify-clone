import { useState } from "react";
import { VolumeIcon } from "../../Icons";

function VolumeControl() {
  const [volume, setVolume] = useState(50);
  return (
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
  );
}

export default VolumeControl;
