import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import MainContent from "../layout/MainContain";

function HomePage() {
  return (
    <main className="flex h-screen w-screen flex-col gap-2 bg-black p-2 text-white">
      <div className="flex flex-1 gap-2 overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>

      <Footer />
    </main>
  );
}
export default HomePage;
