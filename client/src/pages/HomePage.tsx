import SideBar from "../component/layout/SideBar/SideBar";
import PlayerBar from "../component/layout/PlayerBar/PlayerBar";
import MainContainer from "../component/layout/MainContainer/MainContainer";

function HomePage() {
  return (
    <main className="flex h-screen w-screen flex-col gap-2 bg-black p-2 text-white">
      <div className="flex flex-1 gap-2 overflow-hidden">
        <SideBar />
        <MainContainer />
      </div>

      <PlayerBar />
    </main>
  );
}
export default HomePage;
