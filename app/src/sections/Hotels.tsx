import { useEffect, useRef, useState } from 'react';
import { MapPin, Star, ArrowRight, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

const hotels = [
  { id: 1, name: 'Registan Plaza', location: 'Samarqand', rating: 4.9, price: '$89', image: '/images/hotel-1.jpg', stars: 5 },
  { id: 2, name: 'Emir Han', location: 'Buxoro', rating: 4.8, price: '$75', image: '/images/hotel-2.jpg', stars: 5 },
  { id: 3, name: 'Xiva Muhammad', location: 'Xiva', rating: 4.7, price: '$65', image: '/images/service-local.jpg', stars: 4 },
  { id: 4, name: 'Toshkent City', location: 'Toshkent', rating: 4.9, price: '$120', image: '/images/hotel-1.jpg', stars: 5 },
];

const filters = ['filterPrice', 'filterRating', 'filterLocation'];

export default function Hotels() {
  const { t } = useLanguage();
  const { setShowBooking } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardsRef.current?.querySelectorAll('.hotel-card').forEach((card, i) => {
            setTimeout(() => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.transform = 'translateY(0)';
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
    <section ref={sectionRef} id="hotels" className="relative w-full py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#14B8A6] font-semibold">{t('hotelsTitle')}</span>
            <h2 className="mt-3 text-[#0A1628] font-bold leading-[1.05]" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-normal">{t('hotelsTitle')}</span>
            </h2>
            <p className="mt-2 text-sm text-[#5A6578]">{t('hotelsSubtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#5A6578]" />
            <div className="flex gap-2">
              {filters.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeFilter === i ? 'bg-[#0A1628] text-white' : 'bg-white text-[#5A6578] border border-slate-200 hover:border-[#14B8A6]'
                  }`}
                >
                  {t(f)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="hotel-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
              style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
              onClick={() => setShowBooking(true)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 left-3 flex gap-1">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-[#0A1628] flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {hotel.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#0A1628] text-sm">{hotel.name}</h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-[#5A6578]">
                  <MapPin className="w-3 h-3 text-[#14B8A6]" />
                  {hotel.location}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#0A1628]" style={{ fontFamily: "'Playfair Display', serif" }}>{hotel.price}</span>
                    <span className="text-xs text-[#94A3B8] ml-1">{t('perNight')}</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[#14B8A6] text-white flex items-center justify-center hover:bg-[#0D9488] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
