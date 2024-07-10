import { useAuth } from "../../hooks/useAuth";
import { useUserProfile } from "../../hooks/useUserProfile";
import { LogoutIcon } from "../common/Icons";

function Navbar() {
  const { logoutUser } = useAuth();
  const { profile, isLoading, error } = useUserProfile();

  console.log(profile);
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
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full text-xs text-white bg-gray-500">
              ...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center w-full h-full text-xs text-white bg-red-500">
              !
            </div>
          ) : profile?.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-xs text-white bg-gray-500">
              ?
            </div>
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
