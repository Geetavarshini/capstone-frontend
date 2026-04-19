import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../AuthStore/useAuth';
import { toast } from 'react-hot-toast';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("");
    setIsOpen(false);
  };

  const linkStyles = ({ isActive }) =>
    `transition-all duration-300 px-4 py-2 rounded-xl text-sm font-semibold ${
      isActive 
        ? "bg-white/20 text-white backdrop-blur-md" 
        : "text-white/80 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight hidden sm:block">
              BlogApp
            </span>
          </div>

          {/* CENTER TEXT */}
          <div className="hidden md:flex flex-1 justify-center">
            {currentUser && (
              <span className="text-white/90 font-semibold text-lg">
                {currentUser.firstName}'s Dashboard
              </span>
            )}
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">
            {!currentUser ? (
              <ul className="flex items-center gap-3">
                <li><NavLink className={linkStyles} to="/">Home</NavLink></li>
                <li><NavLink className={linkStyles} to="/register">Register</NavLink></li>
                <li><NavLink className={linkStyles} to="/login">Login</NavLink></li>
              </ul>
            ) : (
              <div className="flex items-center gap-3 pl-4">
                <img 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                  src={currentUser.profileImageUrl || `https://ui-avatars.com/api/?name=${currentUser.firstName[0]}${currentUser.lastName[0]}`}
                  alt="profile"
                />
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-red-600 text-sm font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-md"
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
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        
        <div className="px-6 pb-6 space-y-3 bg-gradient-to-b from-indigo-600 to-purple-600">
          
          {!currentUser ? (
            <>
              <NavLink onClick={() => setIsOpen(false)} className="block text-white py-2 font-semibold" to="/">Home</NavLink>
              <NavLink onClick={() => setIsOpen(false)} className="block text-white py-2 font-semibold" to="/register">Register</NavLink>
              <NavLink onClick={() => setIsOpen(false)} className="block text-white py-2 font-semibold" to="/login">Login</NavLink>
            </>
          ) : (
            <div className="pt-4 border-t border-white/20">
              
              <div className="flex items-center gap-3 mb-4">
                <img 
                  className="w-12 h-12 rounded-full border-2 border-white"
                  src={currentUser.profileImageUrl || `https://ui-avatars.com/api/?name=${currentUser.firstName[0]}${currentUser.lastName[0]}`}
                  alt="user"
                />
                <span className="text-white font-semibold">
                  {currentUser.firstName}
                </span>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full py-2 bg-white text-red-600 font-semibold rounded-xl hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}

export default Header;

