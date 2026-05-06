import { useEffect, useRef } from 'react';
import { GraduationCap, Baby, Users, Briefcase, Crown, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const types = [
  { key: 'studentTour', icon: GraduationCap, color: 'bg-sky-50 text-sky-600', border: 'border-sky-100', price: 'dan $149' },
  { key: 'pupilTour', icon: Baby, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100', price: 'dan $99' },
  { key: 'familyTour', icon: Users, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100', price: 'dan $399' },
  { key: 'corporateTour', icon: Briefcase, color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100', price: 'dan $599' },
  { key: 'premiumTour', icon: Crown, color: 'bg-rose-50 text-rose-600', border: 'border-rose-100', price: 'dan $999' },
];

export default function TourTypes() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('.type-card').forEach((card, i) => {
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
    <section ref={sectionRef} className="relative w-full py-20 sm:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#14B8A6] font-semibold">{t('toursTitle')}</span>
          <h2 className="mt-3 text-[#0A1628] font-bold leading-[1.05]" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-normal">{t('tourTypesTitle')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.key}
                className="type-card group cursor-pointer rounded-2xl border p-5 sm:p-6 card-elevate hover:border-[#14B8A6]/30"
                style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', borderColor: '#E2E8F0' }}
              >
                <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-[#0A1628] text-sm">{t(type.key)}</h3>
                <p className="mt-1 text-xs text-[#94A3B8]">{type.price}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#14B8A6] opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('learnMore')} <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
