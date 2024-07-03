import NowPlaying from "./NowPlaying";
import Playcontrols from "./PlayControls";
import VolumeControl from "./VolumeControl";

function Playerbar() {
  return (
    <div className="h-[72px] w-full rounded-lg flex justify-between flex-shrink-0">
      <NowPlaying />
      <Playcontrols />
      <VolumeControl />
    </div>
  );
}

export default Playerbar;
