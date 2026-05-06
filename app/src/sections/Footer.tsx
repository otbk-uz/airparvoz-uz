import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { Globe, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const { setActiveSection, setCurrentPage } = useApp();

  const handleNavClick = (section: string) => {
    setActiveSection('home');
    setCurrentPage('home');
    setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <footer className="relative w-full bg-[#0A1628]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>AIRPARVOZ.UZ</h3>
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-xs">{t('footerDesc')}</p>
            <div className="mt-6 flex items-center gap-3">
              {[Globe, Mail, Phone].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#14B8A6] hover:border-[#14B8A6] transition-all duration-300 group">
                  <Icon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-white/50 uppercase tracking-[0.15em]">{t('quickLinks')}</h4>
            <ul className="mt-6 space-y-3">
              {[
                { key: 'transport', label: t('transportTitle') },
                { key: 'hotels', label: t('hotelsTitle') },
                { key: 'guides', label: t('guidesTitle') },
                { key: 'virtual-tours', label: t('virtualToursTitle') },
              ].map((link) => (
                <li key={link.key}>
                  <button onClick={() => handleNavClick(link.key)} className="text-sm text-white/40 hover:text-[#14B8A6] transition-colors flex items-center gap-1 group">
                    {link.label} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-white/50 uppercase tracking-[0.15em]">{t('services')}</h4>
            <ul className="mt-6 space-y-3">
              {[t('aviabilet'), t('poyezd'), t('avtobus'), t('mashina')].map((s, i) => (
                <li key={i}><span className="text-sm text-white/40 hover:text-[#14B8A6] transition-colors cursor-pointer">{s}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-white/50 uppercase tracking-[0.15em]">{t('contact')}</h4>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#14B8A6] mt-0.5 flex-shrink-0" /><span className="text-sm text-white/40">Toshkent sh., Mustaqillik ko'chasi 45</span></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#14B8A6] flex-shrink-0" /><span className="text-sm text-white/40">+998 71 123 45 67</span></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#14B8A6] flex-shrink-0" /><span className="text-sm text-white/40">info@airparvoz.uz</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">&copy; 2026 Airparvoz.uz. {t('allRights')}.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/25 hover:text-white/50 transition-colors cursor-pointer">{t('privacy')}</span>
            <span className="text-xs text-white/25 hover:text-white/50 transition-colors cursor-pointer">{t('about')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
