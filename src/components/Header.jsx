
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../AuthStore/useAuth';
import { toast } from 'react-hot-toast';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = useAuth((state) => state.currentUser);
  const isHydrated = useAuth((state) => state.isHydrated);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
    setIsOpen(false);
  };

  const linkStyles = ({ isActive }) =>
    `transition-all duration-300 px-4 py-2 rounded-xl text-sm font-semibold ${
      isActive 
        ? "bg-white/20 text-white backdrop-blur-md" 
        : "text-white/80 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="text-white font-extrabold text-xl hidden sm:block">
              BlogApp
            </span>
          </div>

          {/* DASHBOARD TEXT */}
          <div className="hidden md:flex flex-1 justify-center">
            {isHydrated && currentUser && (
              <span className="text-white/90 font-semibold text-lg">
                {currentUser.firstName}'s Dashboard
              </span>
            )}
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-4">
            
            {!isHydrated || !currentUser ? (
              <ul className="flex items-center gap-3">
                <li><NavLink className={linkStyles} to="/">Home</NavLink></li>
                <li><NavLink className={linkStyles} to="/register">Register</NavLink></li>
                <li><NavLink className={linkStyles} to="/login">Login</NavLink></li>
              </ul>
            ) : (
              <div className="flex items-center gap-3 pl-4">
                
                <img 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                  src={currentUser.profileImageUrl}
                  alt="profile"
                />

                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-red-600 text-sm font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white p-2 rounded-md hover:bg-white/20 transition"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

