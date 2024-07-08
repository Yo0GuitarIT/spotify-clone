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
    <div className="flex-1 flex items-center justify-center">
      <button
        className="size-8 flex items-center justify-center  hover:text-[#1DB954] transition-colors"
        onClick={previousTrack}
      >
        <PreviousIcon className="size-6 text-gray-500" />
      </button>
      <button
        className="size-12 bg-[#1DB954] rounded-full mx-4 flex items-center justify-center hover:scale-105 transition-transform"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <PauseIcon className="size-6 text-black" />
        ) : (
          <PlayIcon className="size-6 text-black" />
        )}
      </button>
      <button
        className="size-8 flex items-center justify-center  hover:text-[#1DB954] transition-colors"
        onClick={nextTrack}
      >
        <NextIcon className="size-6 text-gray-500" />
      </button>
    </div>
  );
}

export default Playcontrols;
