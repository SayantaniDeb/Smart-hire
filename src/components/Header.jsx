import { useAuth } from "../contexts/AuthContext";
import { useHiring } from "../contexts/HiringContext";
import { LogOut, RefreshCw } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const { clearAllSelections } = useHiring();

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 md:py-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        
        {/* Dashboard Title */}
        <h1 className="text-2xl md:text-6xl font-extrabold text-white drop-shadow-md tracking-tight">
          Smart<span className="text-yellow-300">Hire</span>
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          
          {/* Reset All Button */}
          <button
            onClick={clearAllSelections}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg backdrop-blur-sm shadow-sm transition-all duration-300"
            title="Reset all selections & filters"
          >
            <RefreshCw size={18} />
            <span className="hidden md:inline font-medium text-sm md:text-base">Reset All</span>
          </button>

          {/* User Email (desktop only) */}
          {user?.email && (
            <span className="hidden md:inline text-white/90 font-medium text-sm md:text-base">
              {user.email}
            </span>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg backdrop-blur-sm shadow-sm transition-all duration-300"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="hidden md:inline font-medium text-sm md:text-base">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
