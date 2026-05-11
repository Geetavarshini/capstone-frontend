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
    `transition-all duration-300 px-5 py-2.5 rounded-2xl text-sm font-bold ${
      isActive
        ? "bg-white text-black shadow-xl"
        : "text-white/80 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/10">

      {/* TOP GRADIENT LINE */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex justify-between items-center h-24">

          {/* LOGO */}
          <div className="flex items-center gap-4 cursor-pointer">

            <div className="relative">

              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 blur-lg opacity-60 rounded-full"></div>

              <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 flex items-center justify-center text-white font-black text-2xl shadow-2xl">
                ✨
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                Blog
                <span className="bg-gradient-to-r from-pink-400 via-orange-300 to-purple-400 text-transparent bg-clip-text">
                  App
                </span>
              </h1>

              <p className="text-xs text-white/40 tracking-widest uppercase">
                Creative Platform
              </p>
            </div>
          </div>

          {/* DASHBOARD TEXT */}
          <div className="hidden lg:flex flex-1 justify-center">

            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">

              <span className="text-white/90 font-semibold text-sm">
                {currentUser?.firstName
                  ? `✨ ${currentUser.firstName}'s Creative Space`
                  : "🌎 Share Your Stories"}
              </span>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">

            {!currentUser ? (
              <ul className="flex items-center gap-3">

                <li>
                  <NavLink
                    className={linkStyles}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={linkStyles}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={linkStyles}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>

              </ul>
            ) : (
              <div className="flex items-center gap-4 pl-4">

                {/* PROFILE */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">

                  <img
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-xl"
                    src={
                      currentUser?.profileImageUrl || ""
                    }
                    alt="profile"
                  />

                  <div className="hidden lg:block">
                    <p className="text-white font-bold text-sm">
                      {currentUser?.firstName || ""}
                    </p>

                    <p className="text-white/50 text-xs">
                      Creator
                    </p>
                  </div>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white font-bold hover:scale-105 transition-all shadow-2xl"
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
              className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xl hover:bg-white/20 transition-all"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >

        <div className="mx-4 mb-4 rounded-[32px] overflow-hidden bg-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl">

          <div className="h-1 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"></div>

          <div className="p-6">

            {!currentUser ? (
              <ul className="space-y-4">

                <li>
                  <NavLink
                    onClick={toggleMenu}
                    className={linkStyles}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    onClick={toggleMenu}
                    className={linkStyles}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    onClick={toggleMenu}
                    className={linkStyles}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>

              </ul>
            ) : (
              <div className="pt-2">

                {/* USER CARD */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10 mb-6">

                  <img
                    className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-xl"
                    src={
                      currentUser?.profileImageUrl || ""
                    }
                    alt="user"
                  />

                  <div>
                    <p className="text-white font-bold text-lg">
                      {currentUser?.firstName || ""}
                    </p>

                    <p className="text-white/50 text-sm">
                      Creative Writer ✨
                    </p>
                  </div>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white font-bold hover:scale-[1.02] transition-all shadow-2xl"
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

    </nav>
  );
}

export default Header;