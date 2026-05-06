import { useState, useEffect, useRef } from 'react';
import { X, MapPin, Star, Globe, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

const guides = [
  { id: 1, name: 'Azizbek Karimov', age: 28, exp: '5 yil', activity: 'Tarixiy gid', image: '/images/vol-azizbek.jpg', region: 'Samarqand', rating: 4.9, langs: ['O\'zbek', 'Rus', 'Ingliz'], bio: 'Samarqand tarixi bo\'yicha mutaxassis' },
  { id: 2, name: 'Gulnora Rahimova', age: 32, exp: '7 yil', activity: 'Madaniaviy gid', image: '/images/vol-gulnora.jpg', region: 'Buxoro', rating: 4.8, langs: ['O\'zbek', 'Rus', 'Ingliz'], bio: 'Buxoro madaniyati bo\'yicha yetakchi' },
  { id: 3, name: 'Jasur Toshkentov', age: 24, exp: '3 yil', activity: 'Sahro turizmi', image: '/images/vol-jasur.jpg', region: 'Xiva', rating: 4.7, langs: ['O\'zbek', 'Rus'], bio: 'Cho\'l va ekoturlar mutaxassisi' },
  { id: 4, name: 'Malika Umarova', age: 26, exp: '4 yil', activity: 'Koordinator', image: '/images/vol-malika.jpg', region: 'Toshkent', rating: 5.0, langs: ['O\'zbek', 'Rus', 'Ingliz'], bio: 'Xalqaro loyihalar koordinatori' },
  { id: 5, name: 'Bekzod Ismoilov', age: 30, exp: '6 yil', activity: "Tog' gid", image: '/images/vol-bekzod.jpg', region: 'Chimgan', rating: 4.9, langs: ['O\'zbek', 'Rus', 'Ingliz'], bio: "Tog' trekking va paragliding" },
  { id: 6, name: 'Nilufar Hayitova', age: 23, exp: '2 yil', activity: "Ta'lim volontyori", image: '/images/vol-nilufar.jpg', region: "Farg'ona", rating: 4.6, langs: ['O\'zbek', 'Rus'], bio: "Ta'lim ekskursiyalari bo'yicha" },
];

export default function Guides() {
  const { t } = useLanguage();
  const { setShowBooking } = useApp();
  const [selected, setSelected] = useState<typeof guides[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gridRef.current?.querySelectorAll('.guide-card').forEach((card, i) => {
            setTimeout(() => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.transform = 'translateY(0) scale(1)';
            }, i * 100);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="guides" className="relative w-full py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#14B8A6] font-semibold">{t('guides')}</span>
          <h2 className="mt-3 text-[#0A1628] font-bold leading-[1.05]" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-normal">{t('guidesTitle')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A6578] max-w-lg mx-auto">{t('guidesSubtitle')}</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {guides.map((g) => (
            <div
              key={g.id}
              className="guide-card group relative cursor-pointer overflow-hidden rounded-xl"
              style={{ opacity: 0, transform: 'translateY(20px) scale(0.96)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
              onClick={() => setSelected(g)}
            >
              <div className="relative aspect-[3/4]">
                <img src={g.image} alt={g.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-medium text-sm truncate">{g.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-[#14B8A6]" />
                      <span className="text-white/60 text-[10px]">{g.region}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-white/60 text-[10px]">{g.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()} style={{ animation: 'slide-up 0.4s ease' }}>
            <div className="relative aspect-[4/3]">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"><X className="w-5 h-5" /></button>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-semibold text-white">{selected.name}</h2>
                <p className="text-white/70 text-sm">{selected.activity}</p>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-slate-50 text-[#5A6578] text-xs rounded-full flex items-center gap-1"><Calendar className="w-3 h-3" />{selected.age} {t('age')}</span>
                <span className="px-3 py-1.5 bg-slate-50 text-[#5A6578] text-xs rounded-full flex items-center gap-1"><MapPin className="w-3 h-3" />{selected.region}</span>
                <span className="px-3 py-1.5 bg-[#14B8A6]/10 text-[#14B8A6] text-xs rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-[#14B8A6]" />{selected.rating}</span>
              </div>
              <div>
                <h3 className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">{t('experience')}</h3>
                <p className="mt-1 text-sm text-[#0A1628] font-medium">{selected.exp}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">{t('about')}</h3>
                <p className="mt-1 text-sm text-[#5A6578] leading-relaxed">{selected.bio}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">{t('selectGuide')}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.langs.map((l) => (
                    <span key={l} className="px-3 py-1.5 border border-slate-200 text-[#5A6578] text-xs rounded-full flex items-center gap-1"><Globe className="w-3 h-3" />{l}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setSelected(null); setShowBooking(true); }} className="flex-1 py-3 rounded-xl bg-[#14B8A6] text-white font-medium hover:bg-[#0D9488] transition-colors flex items-center justify-center gap-2">
                  {t('bookGuide')} <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-[#14B8A6] hover:bg-slate-50 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
