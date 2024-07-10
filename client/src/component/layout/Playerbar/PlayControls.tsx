import { usePlayer } from "../../../hooks/usePlayer";
import {
  PreviousIcon,
  PlayIcon,
  NextIcon,
  PauseIcon,
} from "../../common/Icons";

function Playcontrols() {
  const { isPlaying, play, pause, previousTrack, nextTrack } = usePlayer();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <button
        className="flex items-center justify-center size-8"
        onClick={previousTrack}
      >
        <PreviousIcon className="text-[#a7a7a7] size-6 hover:text-white" />
      </button>
      <button
        className="relative flex items-center justify-center mx-4 bg-white rounded-full size-10 group"
        onClick={handlePlayPause}
      >
        <div className="absolute inset-0 transition-transform duration-300 bg-white rounded-full group-hover:scale-105" />
        {isPlaying ? (
          <PauseIcon className="relative z-10 text-black size-6" />
        ) : (
          <PlayIcon className="relative z-10 text-black size-6" />
        )}
      </button>

      <button
        className="flex items-center justify-center size-8 "
        onClick={nextTrack}
      >
        <NextIcon className="text-[#a7a7a7] size-6 hover:text-white" />
      </button>
    </div>
  );
}

export default Playcontrols;
