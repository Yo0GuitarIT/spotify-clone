import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  ArrowRightIcon,
  LibraryIcon,
  LogoutIcon,
  PlayIcon,
  PreviousIcon,
  NextIcon,
  VolumeIcon,
} from "../component/Icons";

function HomePage() {
  const { logoutUser } = useAuth();
  const [volume, setVolume] = useState(50);

  return (
    <main className="flex h-screen w-screen flex-col gap-2 bg-black p-2 text-white">
      <div className="flex flex-1 gap-2 overflow-hidden">
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
                  <span className="font-bold">你的音樂庫</span>
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
              {[...Array(30)].map((_, index) => (
                <div
                  key={index}
                  className="p-2 h-16 w-full rounded-md flex items-center gap-2 transition-colors duration-200 ease-in-out
                             hover:bg-[#282828] cursor-pointer"
                >
                  <img
                    src="https://i.scdn.co/image/ab67616d000048514fa36b14a276fe560940baa0"
                    alt="Album cover"
                    className="size-12 rounded"
                  />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-white">宇多田光 {index + 1}</p>
                    <p className="text-sm text-[#a7a7a7]">First Love</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
        <div className="flex-1 rounded-lg bg-[#181818] flex flex-col overflow-hidden">
          <header className="h-16 px-6 flex items-center justify-end  max-w-[1955px]">
            <div className="flex items-center gap-2">
              <button
                onClick={logoutUser}
                className="flex items-center py-1 px-2 rounded-full bg-[#0A0A0A] hover:bg-[#282828] transition-colors duration-200 gap-1"
              >
                <LogoutIcon />
                <span className="truncate max-w-[100px]">登出</span>
              </button>

              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0A0A0A] hover:bg-[#282828] transition-colors duration-200">
                <ArrowRightIcon />
              </button>
            </div>
          </header>
          <div className="flex-1 max-w-[1955px] px-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a] rounded-md h-20 hover:bg-[#585858] group transition-colors duration-200 cursor-pointer overflow-hidden flex items-center relative"
                >
                  <img
                    src="https://i.scdn.co/image/ab67616d00001e0290ceed4862375f0d68f55002"
                    alt={`Playlist ${index + 1}`}
                    className="size-20"
                  />
                  <div className="ml-4 flex-grow">
                    <span className="text-sm font-bold truncate">
                      最愛...動力火車
                    </span>
                  </div>
                  <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="bg-[#1ed760] rounded-full p-3 shadow-lg">
                      <ArrowRightIcon className="w-6 h-6 text-black" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {Array(4)
              .fill(null)
              .map((_, sectionIndex) => (
                <div key={sectionIndex}>
                  <div className="h-[60px] flex flex-col-reverse mb-2">
                    <h2 className="text-2xl font-bold">
                      專為 Chen Yu Ling 精心打造 {sectionIndex + 1}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {[...Array(8)].map((_, index) => (
                      <button
                        key={index}
                        className="group relative flex flex-col h-full"
                      >
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
                          <h3 className="font-bold text-base truncate">
                            Daily Mix
                          </h3>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                            康士坦的變化球、Mary See the Future 先知瑪莉、The
                            Beatles、Cream、Puddle Of Mudd
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <footer className="h-[72px] w-full rounded-lg flex justify-between flex-shrink-0">
        <div className="flex-1 flex items-center gap-2">
          <img
            src="https://i.scdn.co/image/ab67616d00001e0290ceed4862375f0d68f55002"
            alt="img"
            className="rounded-sm size-14"
          />
          <div className="flex flex-col gap-[2px]">
            <p className="text-white">宇多田光 </p>
            <p className="text-sm text-[#a7a7a7]">First Love</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <button className="size-8 flex items-center justify-center text-white hover:text-[#1DB954] transition-colors">
            <PreviousIcon className="size-6 text-gray-500" />
          </button>
          <button className="size-12 bg-[#1DB954] rounded-full mx-4 flex items-center justify-center hover:scale-105 transition-transform">
            <PlayIcon className="size-6 text-black" />
          </button>
          <button className="size-8 flex items-center justify-center text-white hover:text-[#1DB954] transition-colors">
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
    </main>
  );
}
export default HomePage;
