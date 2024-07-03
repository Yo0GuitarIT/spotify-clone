import Navigation from "./Navigation";
import RecentlyPlayed from "./RecentlyPlayed";

function SideBar() {
  return (
    <aside className="flex w-[420px] flex-col gap-2 overflow-hidden">
      <Navigation />
      <RecentlyPlayed />
    </aside>
  );
}

export default SideBar;
