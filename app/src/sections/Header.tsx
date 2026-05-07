import { useState, useEffect } from 'react';
import { Globe, ChevronDown, Menu, X, User, Sparkles, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import type { Language } from '@/context/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn, user, currentPage, setCurrentPage, setActiveSection, isAdmin } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection('home');
    setCurrentPage('home');
    setShowMobileMenu(false);
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        setCurrentPage('admin');
        setActiveSection('admin');
      } else {
        setCurrentPage('dashboard');
        setActiveSection('dashboard');
      }
    } else {
      setCurrentPage('register');
      setActiveSection('register');
    }
    setShowMobileMenu(false);
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'uz', label: "O'zbek" },
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
  ];

  const navLinks = [
    { id: 'transport', label: t('services') },
    { id: 'hotels', label: t('hotelsTitle') },
    { id: 'tour-firms', label: t('tourFirmsTitle') },
    { id: 'virtual-tours', label: t('virtualToursTitle') },
    { id: 'users', label: t('usersCount'), isStat: true },
    { id: 'reviews', label: t('reviews') },
    { id: 'ratings', label: t('ratings') },
  ];

  const isHome = currentPage === 'home';

  return (
    <>
      {/* Desktop Glassmorphism Nav */}
      <header className={`fixed top-0 left-0 right-0 z-50 hidden lg:flex justify-center pt-4 px-4 transition-all duration-500 ${!isHome ? 'opacity-0 pointer-events-none' : ''}`}>
        <nav className={`glass-nav rounded-full px-6 py-2.5 flex items-center gap-6 max-w-[95%] w-full transition-all duration-500 ${scrolled ? 'glass-nav-solid !rounded-none !max-w-none !mt-0 !pt-3 !pb-3 !px-8 shadow-lg' : ''}`}>
          {/* Logo */}
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 flex-shrink-0">
            <Sparkles className="w-5 h-5 text-[#14B8A6]" />
            <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-[#0A1628]' : 'text-white'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('siteName')}
            </span>
          </button>

          {/* Center Nav */}
          <div className="flex-1 flex items-center justify-center gap-5 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-[13px] font-medium transition-colors hover:text-[#14B8A6] whitespace-nowrap ${link.isStat ? 'text-[#14B8A6]' : (scrolled ? 'text-[#5A6578]' : 'text-white/80')}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Search Panel */}
          <div className="relative group flex-shrink-0">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${scrolled ? 'bg-slate-50 border-slate-200' : 'bg-white/10 border-white/20'}`}>
              <Search className={`w-3.5 h-3.5 ${scrolled ? 'text-slate-400' : 'text-white/50'}`} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className={`bg-transparent border-none outline-none text-xs w-24 focus:w-40 transition-all ${scrolled ? 'text-slate-900 placeholder:text-slate-400' : 'text-white placeholder:text-white/40'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  scrolled ? 'text-[#5A6578] hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 min-w-[140px] z-50 animate-scale-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-slate-50 ${language === lang.code ? 'text-[#14B8A6] font-medium' : 'text-[#0A1628]'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Start Button (Static Color) */}
            <button
              onClick={() => handleNavClick('home')}
              className="px-5 py-2 rounded-full text-sm font-semibold bg-[#14B8A6] text-white hover:bg-[#0D9488] shadow-lg shadow-[#14B8A6]/20 transition-all active:scale-95"
            >
              {t('start')}
            </button>

            {/* Login / User */}
            <button
              onClick={handleLoginClick}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isLoggedIn
                  ? 'bg-slate-800 text-white'
                  : scrolled
                  ? 'bg-[#0A1628] text-white hover:bg-[#1e293b]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {isLoggedIn ? user?.name?.split(' ')[0] : t('login')}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav */}
      <header className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${scrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#14B8A6]" />
            <span className={`text-base font-bold ${scrolled || !isHome ? 'text-[#0A1628]' : 'text-white'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('siteName')}
            </span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleLoginClick} className={`p-2 rounded-full ${scrolled || !isHome ? 'text-[#0A1628]' : 'text-white'}`}>
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className={`p-2 rounded-full ${scrolled || !isHome ? 'text-[#0A1628]' : 'text-white'}`}>
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="bg-white border-t border-slate-100 px-4 py-4 space-y-4 animate-fade-in-up">
            {/* Mobile Search */}
            <div className="px-2">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="bg-transparent border-none outline-none text-sm text-slate-900 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => handleNavClick(link.id)} className="w-full text-left px-4 py-3 rounded-xl text-sm text-[#0A1628] hover:bg-slate-50 font-medium">
                  {link.label}
                </button>
              ))}
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setShowMobileMenu(false); }}
                  className={`px-4 py-2 rounded-full text-xs font-medium border ${language === lang.code ? 'bg-[#14B8A6] text-white border-[#14B8A6]' : 'text-[#5A6578] border-slate-200'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
