import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import { useAuth } from '../AuthStore/useAuth';

function RootLayout() {
  const isHydrated = useAuth(
    (state) => state.isHydrated
  );

  const checkAuth = useAuth(
    (state) => state.checkAuth
  );

  useEffect(() => {
    if (isHydrated) {
      checkAuth();
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <div className="relative min-h-screen overflow-hidden flex justify-center items-center bg-[#fffaf7]">

        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

        {/* LOADER */}
        <div className="relative z-10 text-center">

          <div className="flex justify-center mb-8">

            <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin"></div>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-3">
            Loading
          </h2>

          <p className="text-gray-500 text-lg">
            Preparing your experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fffaf7]">

      <Header />

      <main className="flex-grow relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;