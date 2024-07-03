import PersionalizedSection from "./PersionalizedSection";
import RecentlyPlayed from "./RecentlyPlayed";
import Navbar from "../Navbar";

function MainContainer() {
  return (
    <div className="flex-1 rounded-lg bg-[#181818] flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 max-w-[1955px] px-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        <RecentlyPlayed />
        <PersionalizedSection />
      </div>
    </div>
  );
}

export default MainContainer;
