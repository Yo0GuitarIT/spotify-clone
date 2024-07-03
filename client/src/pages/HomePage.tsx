import SideBar from "../component/layout/SideBar/SideBar";
import Playerbar from "../component/layout/PlayerBar/PlayerBar";
import MainContent from "../component/layout/MainContain";

function HomePage() {
  return (
    <main className="flex h-screen w-screen flex-col gap-2 bg-black p-2 text-white">
      <div className="flex flex-1 gap-2 overflow-hidden">
        <SideBar />
        <MainContent />
      </div>

      <Playerbar />
    </main>
  );
}
export default HomePage;
