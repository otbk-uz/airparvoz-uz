import { useState } from 'react';
import { X, Calendar, Users, MapPin, Check, ChevronRight, Star, CreditCard, Tag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

const destinations = ['Samarqand', 'Buxoro', 'Xiva', 'Toshkent', "Farg'ona", 'Namangan'];
const guides = [
  { name: 'Azizbek Karimov', region: 'Samarqand', rating: 4.9 },
  { name: 'Gulnora Rahimova', region: 'Buxoro', rating: 4.8 },
  { name: 'Jasur Toshkentov', region: 'Xiva', rating: 4.7 },
  { name: 'Malika Umarova', region: 'Toshkent', rating: 5.0 },
];

export default function BookingModal() {
  const { t } = useLanguage();
  const { showBooking, setShowBooking, addBooking } = useApp();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({ destination: '', date: '', participants: 1, guide: '', promo: '' });
  const [confirmed, setConfirmed] = useState(false);

  if (!showBooking) return null;

  const handleConfirm = () => {
    addBooking({
      id: Date.now().toString(),
      type: 'Custom',
      destination: booking.destination,
      date: booking.date,
      participants: booking.participants,
      guide: booking.guide,
      status: 'pending',
    });
    setConfirmed(true);
    setTimeout(() => { setShowBooking(false); setConfirmed(false); setStep(1); setBooking({ destination: '', date: '', participants: 1, guide: '', promo: '' }); }, 2500);
  };

  const canProceed = () => {
    if (step === 1) return booking.destination !== '';
    if (step === 2) return booking.date !== '';
    if (step === 3) return booking.guide !== '';
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm" style={{ animation: 'fade-in 0.2s ease' }}>
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" style={{ animation: 'slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <h3 className="text-lg font-semibold text-[#0A1628]">{t('bookingTitle')}</h3>
          <button onClick={() => setShowBooking(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"><X className="w-4 h-4 text-[#5A6578]" /></button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center" style={{ animation: 'fade-in-up 0.4s ease' }}>
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4"><Check className="w-8 h-8 text-emerald-600" /></div>
            <h4 className="text-lg font-semibold text-[#0A1628]">Bron tasdiqlandi!</h4>
            <p className="mt-2 text-sm text-[#5A6578]">Sayohatingiz muvaffaqiyatli bron qilindi.</p>
          </div>
        ) : (
          <>
            <div className="px-5 sm:px-6 pt-4 flex items-center gap-2 flex-shrink-0">
              {[1, 2, 3, 4, 5].map((s) => <div key={s} className={`flex-1 h-1 rounded-full transition-colors duration-300 ${s <= step ? 'bg-[#14B8A6]' : 'bg-slate-100'}`} />)}
            </div>
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {step === 1 && (
                <div style={{ animation: 'fade-in-up 0.3s ease' }}>
                  <h4 className="font-semibold text-[#0A1628] mb-1 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#14B8A6]" />{t('selectService')}</h4>
                  <p className="text-xs text-[#94A3B8] mb-4">Qayerga bormoqchisiz?</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {destinations.map((dest) => (
                      <button key={dest} onClick={() => setBooking({ ...booking, destination: dest })} className={`p-3.5 rounded-xl border-2 text-sm font-medium transition-all ${booking.destination === dest ? 'border-[#14B8A6] bg-[#14B8A6]/5 text-[#14B8A6]' : 'border-slate-100 text-[#0A1628] hover:border-[#14B8A6]/30'}`}>{dest}</button>
                    ))}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div style={{ animation: 'fade-in-up 0.3s ease' }}>
                  <h4 className="font-semibold text-[#0A1628] mb-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#14B8A6]" />{t('selectDate')}</h4>
                  <p className="text-xs text-[#94A3B8] mb-4">Qachon yo'lga chiqasiz?</p>
                  <input type="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 text-sm focus:border-[#14B8A6] transition-colors" min={new Date().toISOString().split('T')[0]} />
                  <div className="mt-6">
                    <h4 className="font-semibold text-[#0A1628] mb-1 flex items-center gap-2"><Users className="w-4 h-4 text-[#14B8A6]" />{t('participants')}</h4>
                    <p className="text-xs text-[#94A3B8] mb-3">Nechta kishi?</p>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setBooking({ ...booking, participants: Math.max(1, booking.participants - 1) })} className="w-12 h-12 rounded-xl border-2 border-slate-100 flex items-center justify-center text-lg font-medium hover:border-[#14B8A6] transition-colors active:scale-95">-</button>
                      <span className="text-2xl font-bold text-[#0A1628] w-10 text-center">{booking.participants}</span>
                      <button onClick={() => setBooking({ ...booking, participants: Math.min(20, booking.participants + 1) })} className="w-12 h-12 rounded-xl border-2 border-slate-100 flex items-center justify-center text-lg font-medium hover:border-[#14B8A6] transition-colors active:scale-95">+</button>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div style={{ animation: 'fade-in-up 0.3s ease' }}>
                  <h4 className="font-semibold text-[#0A1628] mb-1 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#14B8A6]" />{t('selectGuide')}</h4>
                  <p className="text-xs text-[#94A3B8] mb-4">O'z gidni tanlang</p>
                  <div className="space-y-2.5">
                    {guides.map((g) => (
                      <button key={g.name} onClick={() => setBooking({ ...booking, guide: g.name })} className={`w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between ${booking.guide === g.name ? 'border-[#14B8A6] bg-[#14B8A6]/5' : 'border-slate-100 hover:border-[#14B8A6]/30'}`}>
                        <div><span className={`text-sm font-medium block ${booking.guide === g.name ? 'text-[#14B8A6]' : 'text-[#0A1628]'}`}>{g.name}</span><span className="text-xs text-[#94A3B8]">{g.region}</span></div>
                        <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /><span className="text-xs text-[#5A6578]">{g.rating}</span></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 4 && (
                <div style={{ animation: 'fade-in-up 0.3s ease' }}>
                  <h4 className="font-semibold text-[#0A1628] mb-1 flex items-center gap-2"><Tag className="w-4 h-4 text-[#14B8A6]" />Promo kod</h4>
                  <p className="text-xs text-[#94A3B8] mb-4">Chegirma kodi bormi?</p>
                  <input type="text" value={booking.promo} onChange={(e) => setBooking({ ...booking, promo: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 text-sm focus:border-[#14B8A6] transition-colors" placeholder="PROMO2026" />
                </div>
              )}
              {step === 5 && (
                <div style={{ animation: 'fade-in-up 0.3s ease' }}>
                  <h4 className="font-semibold text-[#0A1628] mb-4">{t('confirm')}</h4>
                  <div className="space-y-3 bg-slate-50 rounded-xl p-5">
                    {[{ label: t('region'), value: booking.destination, icon: MapPin }, { label: t('selectDate'), value: booking.date, icon: Calendar }, { label: t('participants'), value: `${booking.participants} kishi`, icon: Users }, { label: t('selectGuide'), value: booking.guide, icon: Star }].map((item, i) => {
                      const Icon = item.icon;
                      return <div key={i} className="flex items-center justify-between text-sm py-1"><div className="flex items-center gap-2 text-[#94A3B8]"><Icon className="w-3.5 h-3.5 text-[#14B8A6]" />{item.label}</div><span className="font-medium text-[#0A1628]">{item.value}</span></div>;
                    })}
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between"><span className="text-sm text-[#94A3B8] flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" />Jami</span><span className="text-lg font-bold text-[#0A1628]" style={{ fontFamily: "'Playfair Display', serif" }}>$299</span></div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-5 sm:px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
              {step > 1 ? <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 rounded-xl border-2 border-slate-100 text-[#5A6578] text-sm font-medium hover:bg-slate-50 active:scale-95">{t('back')}</button> : <div />}
              <button onClick={() => { if (step < 5) setStep(step + 1); else handleConfirm(); }} disabled={!canProceed()} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#14B8A6] text-white text-sm font-semibold hover:bg-[#0D9488] transition-all active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed">
                {step === 5 ? t('pay') : t('next')}<ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
