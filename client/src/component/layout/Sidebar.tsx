import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusIcon,
  ArrowRightIcon,
} from "../Icons";
import { useUserRecentltPlayedTrack } from "../../hooks/useUserRecentlyPlayedTracks";

function Sidebar() {
  const { tracks } = useUserRecentltPlayedTrack();

  return (
    <aside className="flex w-[420px] flex-col gap-2 overflow-hidden">
      <nav className="flex-shrink-0">
        <ul className="h-28 rounded-lg bg-[#181818] px-3 py-2">
          <li className="flex items-center gap-5 h-12 w-full py-1 px-3">
            <HomeIcon />
            <span>首頁</span>
          </li>
          <li className="flex items-center gap-5 h-12 w-full py-1 px-3">
            <SearchIcon />
            <span>搜尋</span>
          </li>
        </ul>
      </nav>
      <div className="rounded-lg flex-1 bg-[#181818] flex flex-col overflow-hidden">
        <header className="h-14 py-2 px-4 flex gap-2 items-center flex-shrink-0">
          <div className="flex-1">
            <button className="w-[132px] h-10 items-center flex justify-between py-1 px-2 text-[#b3b3b3] hover:text-white transition-colors duration-200">
              <LibraryIcon className="w-6 h-6" />
              <span className="font-bold">最近播放</span>
            </button>
          </div>
          <button className="w-8 h-8 flex justify-center items-center text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-all duration-200">
            <PlusIcon className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex justify-center items-center text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-all duration-200">
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="p-2 h-16 w-full rounded-md flex items-center gap-2 transition-colors duration-200 ease-in-out
                           hover:bg-[#282828] cursor-pointer"
            >
              <img
                src={track.albumCoverUrl}
                alt={`${track.artist} - ${track.song}`}
                className="size-12 rounded"
              />
              <div className="flex flex-col gap-[2px]">
                <p>{track.song}</p>
                <p className="text-sm text-[#a7a7a7]">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
