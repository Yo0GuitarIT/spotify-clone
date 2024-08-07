import { usePlayer } from "../../../hooks/usePlayer";
import { VolumeIcon, VolumeMuteIcon } from "../../common/Icons";

function VolumeControl() {
  const { volume, setVolume, isMuted, toggleMute } = usePlayer();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="flex items-center justify-end flex-1">
      <div className="flex items-center space-x-2">
        <button onClick={toggleMute} className="focus:outline-none">
          {isMuted || volume === 0 ? (
            <VolumeMuteIcon className="text-[#a7a7a7] transition-colors size-6 hover:text-white" />
          ) : (
            <VolumeIcon className="text-[#a7a7a7] transition-colors size-6 hover:text-white" />
          )}
        </button>
        <div className="w-24 mb-2 group">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
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
