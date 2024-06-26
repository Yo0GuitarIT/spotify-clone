import { useAuth } from "../hooks/useAuth";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  ArrowRightIcon,
  LibraryIcon,
  LogoutIcon,
} from "../component/Icons";

function HomePage() {
  const { logoutUser } = useAuth();

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
                    src="placeholder-image-url"
                    alt="Album cover"
                    className="size-12 rounded"
                  />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-white font-medium">Item {index + 1}</p>
                    <p className="text-sm text-[#a7a7a7]">Subtitle</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
        <div className="flex-1 rounded-lg bg-[#181818] flex flex-col overflow-hidden">
          <header className="h-16 px-6 flex items-center justify-end bg-[#121212]">
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
          <div className="flex-1 overflow-y-auto p-8">
            {/* Main content goes here */}
          </div>
        </div>
      </div>
      <footer className="h-[72px] w-full rounded-lg flex-shrink-0">
        Now playing bar
      </footer>
    </main>
  );
}
export default HomePage;