import { useAuth } from "../contexts/AuthContext";
import { LogOut } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg backdrop-blur-sm">
      {/* Inner container with horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 md:py-4 flex justify-between items-center">
        {/* Dashboard Title */}
        <h1 className="text-2xl md:text-6xl font-extrabold text-white drop-shadow-md tracking-tight">
          Smart<span className="text-yellow-300">Hire</span>
        </h1>

        {/* User Info + Logout */}
        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="hidden md:inline text-white/90 font-medium text-base">
              {user.email}
            </span>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-3 md:px-5 md:py-2.5 rounded-lg backdrop-blur-sm shadow-sm transition-all duration-300"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="hidden md:inline font-medium text-base">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
