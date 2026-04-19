
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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <p className="text-white text-lg">Loading your session...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;

