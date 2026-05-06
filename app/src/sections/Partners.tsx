import { useLanguage } from '@/context/LanguageContext';
import { Plane, Hotel, Car, Camera, Compass, Mountain, Ticket, Map, Ship, Train } from 'lucide-react';

const partners = [
  { name: 'Uzbekistan Airways', icon: Plane },
  { name: 'Hyatt Regency', icon: Hotel },
  { name: 'Hertz', icon: Car },
  { name: 'Focus Studio', icon: Camera },
  { name: 'Nomad Tours', icon: Compass },
  { name: 'Trekking Club', icon: Mountain },
  { name: 'Ticket.uz', icon: Ticket },
  { name: 'OpenMap', icon: Map },
  { name: 'Aral Shipping', icon: Ship },
  { name: 'Railways', icon: Train },
];

export default function Partners() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-14 sm:py-20 bg-[#F8FAFC] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-8">
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8] font-semibold">{t('partnersTitle')}</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-16 sm:gap-24" style={{ animation: 'marquee-scroll 40s linear infinite', width: 'max-content' }}>
          {[...partners, ...partners, ...partners].map((partner, i) => {
            const Icon = partner.icon;
            return (
              <div key={`${partner.name}-${i}`} className="flex items-center gap-3 flex-shrink-0 group opacity-35 hover:opacity-100 transition-opacity duration-300">
                <Icon className="w-5 h-5 text-[#0A1628] group-hover:text-[#14B8A6] transition-colors" />
                <span className="text-sm sm:text-base font-medium text-[#0A1628] group-hover:text-[#14B8A6] transition-colors whitespace-nowrap">{partner.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
