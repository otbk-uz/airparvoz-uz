import { useEffect } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { AppProvider, useApp } from '@/context/AppContext';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import Transport from '@/sections/Transport';
import Hotels from '@/sections/Hotels';
import TourFirms from '@/sections/TourFirms';
import Virtual360 from '@/sections/Virtual360';
import Guides from '@/sections/Guides';
import TourTypes from '@/sections/TourTypes';
import Partners from '@/sections/Partners';
import Footer from '@/sections/Footer';
import Registration from '@/sections/Registration';
import Dashboard from '@/sections/Dashboard';
import AdminPanel from '@/sections/AdminPanel';
import BookingModal from '@/sections/BookingModal';
import AIChat from '@/sections/AIChat';
import './App.css';

function AppContent() {
  const { currentPage } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {currentPage === 'home' && (
        <main>
          <Hero />
          <Transport />
          <Hotels />
          <TourFirms />
          <Virtual360 />
          <Guides />
          <TourTypes />
          <Partners />
          <Footer />
          <AIChat />
        </main>
      )}

      {currentPage === 'register' && <Registration />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'admin' && <AdminPanel />}

      <BookingModal />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
