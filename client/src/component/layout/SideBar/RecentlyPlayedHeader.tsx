import { LibraryIcon, PlusIcon, ArrowRightIcon } from "../../common/Icons";

function RecentlyPlayedHeader() {
  return (
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
  );
}

export default RecentlyPlayedHeader;
