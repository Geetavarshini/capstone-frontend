import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../AuthStore/useAuth';
import { toast } from 'react-hot-toast';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = useAuth(
    (state) => state.currentUser
  );

  const isHydrated = useAuth(
    (state) => state.isHydrated
  );

  const logout = useAuth(
    (state) => state.logout
  );

  const navigate = useNavigate();

  const toggleMenu = () =>
    setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();

    toast.success(
      "Logged out successfully"
    );

    navigate("/");

    setIsOpen(false);
  };

  const linkStyles = ({ isActive }) =>
    `transition-colors duration-200 text-sm font-medium ${
      isActive
        ? "text-gray-900"
        : "text-gray-500 hover:text-gray-900"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#fffaf7]/95 backdrop-blur-xl border-b border-[#ece5df] shadow-[0_2px_20px_rgba(0,0,0,0.03)]">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer"
          >

            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              BlogApp
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">

            {!currentUser ? (
              <ul className="flex items-center gap-8">

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
              <div className="flex items-center gap-5">

                {/* PROFILE */}
                <div className="flex items-center gap-3">

                  <img
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    src={
                      currentUser?.profileImageUrl ||
                      ""
                    }
                    alt="profile"
                  />

                  <div className="hidden lg:block">

                    <p className="text-sm font-medium text-gray-900">
                      {
                        currentUser?.firstName
                      }
                    </p>

                    <p className="text-xs text-gray-400 capitalize">
                      {
                        currentUser?.role
                      }
                    </p>
                  </div>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-2xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition-all shadow-sm"
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
              className="w-11 h-11 rounded-2xl bg-white border border-gray-200 text-gray-700 text-lg transition-all shadow-sm"
            >
              {isOpen ? "×" : "☰"}
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

        <div className="px-6 pb-6">

          <div className="bg-[#fffaf7]/95 backdrop-blur-xl border border-[#ece5df] rounded-[28px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

            {!currentUser ? (
              <ul className="space-y-5">

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
              <div>

                {/* USER */}
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-6">

                  <img
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                    src={
                      currentUser?.profileImageUrl ||
                      ""
                    }
                    alt="user"
                  />

                  <div>

                    <p className="text-sm font-medium text-gray-900">
                      {
                        currentUser?.firstName
                      }
                    </p>

                    <p className="text-xs text-gray-400 capitalize">
                      {
                        currentUser?.role
                      }
                    </p>
                  </div>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-2xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition-all shadow-sm"
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