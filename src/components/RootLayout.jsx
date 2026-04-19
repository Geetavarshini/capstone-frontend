import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import { useAuth } from '../AuthStore/useAuth';

function RootLayout() {
  const loading = useAuth((state) => state.loading);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isHydrated = useAuth((state) => state.isHydrated); 

 
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center">
          
          <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mb-4"></div>
          
          <h2 className="text-white font-semibold text-lg tracking-wide animate-pulse">
            Loading your session...
          </h2>
        </div>

      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      
      {/* ✅ Header now gets correct user (no flicker / no initials) */}
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;