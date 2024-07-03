import { useAuth } from "../../contexts/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import { LogoutIcon } from "../Icons";

function Navbar() {
  const { logoutUser } = useAuth();
  const { profile } = useUserProfile();

  return (
    <header className="h-16 px-6 flex items-center justify-end max-w-[1955px]">
      <div className="flex items-center gap-2">
        <button
          onClick={logoutUser}
          className="flex items-center py-1 px-2 rounded-full bg-[#0A0A0A] hover:bg-[#282828] transition-colors duration-200 gap-1"
        >
          <LogoutIcon />
          <span className="truncate max-w-[100px]">登出</span>
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0A0A0A] hover:bg-[#282828] transition-colors duration-200 overflow-hidden">
          {profile?.url ? (
            <img
              src={profile.url}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-xs">
              ?
            </div>
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
