import Sidebar from "../component/layout/Sidebar";
import Playerbar from "../component/layout/Playerbar/Playerbar";
import MainContent from "../component/layout/MainContain";

function HomePage() {
  return (
    <main className="flex h-screen w-screen flex-col gap-2 bg-black p-2 text-white">
      <div className="flex flex-1 gap-2 overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>

      <Playerbar />
    </main>
  );
}
export default HomePage;
