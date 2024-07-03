import { HomeIcon, SearchIcon } from "../../Icons"

function Navigation() { 
    return (
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
    )
}

export default Navigation;