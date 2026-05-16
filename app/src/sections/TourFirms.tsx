import { useEffect, useRef } from 'react';
import { Star, MapPin, ArrowRight, Building2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

const firms = [
  { id: 1, name: 'Samarkand Travel', location: 'Samarqand', rating: 4.9, tours: 24, image: '/images/tour-samarkand.jpg', featured: 'Samarqand — Buxoro' },
  { id: 2, name: 'Khiva Expeditions', location: 'Xiva', rating: 4.8, tours: 18, image: '/images/tour-khiva.jpg', featured: 'Xiva — Urganch' },
  { id: 3, name: 'Desert Nomads', location: 'Nukus', rating: 4.7, tours: 12, image: '/images/tour-aral.jpg', featured: 'Aral Dengizi' },
];

export default function TourFirms() {
  const { t } = useLanguage();
  const { setShowBooking } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardsRef.current?.querySelectorAll('.firm-card').forEach((card, i) => {
            setTimeout(() => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.transform = 'translateY(0)';
            }, i * 150);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="tour-firms" className="relative w-full py-20 sm:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#14B8A6] font-semibold">{t('explore')}</span>
          <h2 className="mt-3 text-[#0A1628] font-bold leading-[1.05]" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-normal">{t('tourFirmsTitle')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A6578] max-w-lg mx-auto">{t('tourFirmsSubtitle')}</p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {firms.map((firm) => (
            <div
              key={firm.id}
              className="firm-card group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-100 hover:border-[#14B8A6]/30 hover:shadow-xl transition-all duration-500"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
              onClick={() => setShowBooking(true)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={firm.image} alt={firm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#14B8A6] text-white text-[10px] font-semibold rounded uppercase tracking-wider">{t('toursTitle')}</span>
                    <span className="text-white/80 text-xs">{firm.featured}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#0A1628]">{firm.name}</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[#0A1628] font-medium">{firm.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-[#5A6578]">
                  <MapPin className="w-3 h-3" />
                  {firm.location}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#5A6578]">
                    <Building2 className="w-3.5 h-3.5" />
                    {firm.tours} {t('toursTitle').toLowerCase()}
                  </div>
                  <span className="text-sm font-medium text-[#14B8A6] flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t('viewTours')} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
