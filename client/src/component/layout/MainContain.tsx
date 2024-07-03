import { PlayIcon, ArrowRightIcon } from "../Icons";
import Navbar from "./Navbar";

function MainContent() {
  return (
    <div className="flex-1 rounded-lg bg-[#181818] flex flex-col overflow-hidden">
      <Navbar />
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
        N
      </div>
    </div>
  );
}

export default MainContent;
