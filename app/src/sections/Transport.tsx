import { useEffect, useRef } from 'react';
import { Plane, Train, Bus, Car, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

const services = [
  { icon: Plane, title: 'aviabilet', desc: 'aviaDesc', color: 'bg-sky-50 text-sky-600', border: 'border-sky-100' },
  { icon: Train, title: 'poyezd', desc: 'poyezdDesc', color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  { icon: Bus, title: 'avtobus', desc: 'avtobusDesc', color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
  { icon: Car, title: 'mashina', desc: 'mashinaDesc', color: 'bg-rose-50 text-rose-600', border: 'border-rose-100' },
];

export default function Transport() {
  const { t } = useLanguage();
  const { setShowBooking } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardsRef.current?.querySelectorAll('.transport-card').forEach((card, i) => {
            setTimeout(() => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.transform = 'translateY(0)';
            }, i * 120);
          });
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="transport" className="relative w-full py-20 sm:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-18">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#14B8A6] font-semibold">{t('services')}</span>
          <h2 className="mt-3 text-[#0A1628] font-bold leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-normal">{t('transportTitle')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A6578] max-w-lg mx-auto">{t('transportSubtitle')}</p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="transport-card group cursor-pointer rounded-2xl border p-6 sm:p-8 card-elevate hover:border-[#14B8A6]/40 transition-all duration-300"
                onClick={() => setShowBooking(true)}
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  borderColor: '#E2E8F0',
                }}
              >
                <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#0A1628] group-hover:text-[#14B8A6] transition-colors">{t(service.title)}</h3>
                <p className="mt-2 text-sm text-[#5A6578] leading-relaxed">{t(service.desc)}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-medium text-[#14B8A6] opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('learnMore')} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
