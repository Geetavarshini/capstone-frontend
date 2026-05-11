import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import { useAuth } from '../AuthStore/useAuth';

function RootLayout() {
  const isHydrated = useAuth((state) => state.isHydrated);

  const checkAuth = useAuth((state) => state.checkAuth);

  useEffect(() => {
    if (isHydrated) {
      checkAuth();
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <div className="relative min-h-screen overflow-hidden flex justify-center items-center bg-[#111111]">

        {/* BACKGROUND BLOBS */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20"></div>

        <div className="absolute top-40 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-10"></div>

        {/* LOADER CARD */}
        <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] px-12 py-10 shadow-2xl text-center">

          {/* SPINNER */}
          <div className="relative flex justify-center mb-8">

            <div className="w-20 h-20 border-4 border-white/20 border-t-pink-400 rounded-full animate-spin"></div>

            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              ✨
            </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-3">
            Loading Session
          </h2>

          <p className="text-white/60 text-lg">
            Preparing your creative space...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f2]">

      <Header />

      <main className="flex-grow relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;