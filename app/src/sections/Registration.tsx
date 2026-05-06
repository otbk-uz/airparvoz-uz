import { useState } from 'react';
import { User, Users, GraduationCap, Building2, ArrowRight, Check, Sparkles, Globe, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

const roles = [
  { key: 'tourist', icon: User, label: 'tourist', color: 'hover:border-sky-400 hover:bg-sky-50/50' },
  { key: 'local', icon: Users, label: 'local', color: 'hover:border-emerald-400 hover:bg-emerald-50/50' },
  { key: 'student', icon: GraduationCap, label: 'student', color: 'hover:border-amber-400 hover:bg-amber-50/50' },
  { key: 'business', icon: Building2, label: 'business', color: 'hover:border-rose-400 hover:bg-rose-50/50' },
];

export default function Registration() {
  const { t } = useLanguage();
  const { setUser, setCurrentPage, setActiveSection, setSelectedRole } = useApp();
  const [step, setStep] = useState(1);
  const [selected, setLocalRole] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [otp, setOtp] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRole = (role: string) => { setLocalRole(role); setSelectedRole(role as any); };

  const handleSubmit = () => {
    setUser({ name: form.name, email: form.email, phone: form.phone, role: selected as any });
    setShowSuccess(true);
    setTimeout(() => { setCurrentPage('home'); setActiveSection('home'); }, 2500);
  };

  return (
    <section className="relative w-full min-h-screen flex bg-[#0A1628]">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[42%] flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none"><line x1="50" y1="0" x2="50" y2="600" stroke="white" strokeWidth="0.5"/><line x1="150" y1="0" x2="150" y2="600" stroke="white" strokeWidth="0.5"/><line x1="250" y1="0" x2="250" y2="600" stroke="white" strokeWidth="0.5"/><line x1="350" y1="0" x2="350" y2="600" stroke="white" strokeWidth="0.5"/><line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="0.5"/><line x1="0" y1="300" x2="400" y2="300" stroke="white" strokeWidth="0.5"/><circle cx="200" cy="300" r="120" stroke="white" strokeWidth="0.5"/></svg>
        </div>
        <div className="relative z-10 text-center">
          <Sparkles className="w-12 h-12 text-[#14B8A6] mx-auto mb-6" />
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontFamily: "'Playfair Display', serif" }}>{t('regTitle')}</h2>
          <p className="mt-4 text-white/40 text-sm max-w-xs mx-auto">{t('footerDesc')}</p>
          <div className="mt-8 flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((i) => <div key={i} className={`w-2 h-2 rounded-full ${step >= i ? 'bg-[#14B8A6]' : 'bg-white/20'}`} />)}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Sparkles className="w-10 h-10 text-[#14B8A6] mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-[#0A1628]">{t('regTitle')}</h2>
          </div>

          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-semibold text-[#0A1628] mb-1">{t('selectRole')}</h3>
              <p className="text-sm text-[#94A3B8] mb-6">{t('services')}</p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSel = selected === role.key;
                  return (
                    <button key={role.key} onClick={() => handleRole(role.key)} className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 text-center transition-all ${isSel ? 'border-[#14B8A6] bg-[#14B8A6]/5' : 'border-slate-100 ' + role.color}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSel ? 'bg-[#14B8A6] text-white' : 'bg-slate-50 text-[#5A6578]'}`}><Icon className="w-5 h-5" /></div>
                      <span className="text-sm font-medium text-[#0A1628]">{t(role.label)}</span>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => selected && setStep(2)} disabled={!selected} className="mt-8 w-full py-3.5 rounded-xl bg-[#14B8A6] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-colors disabled:opacity-40">
                {t('next')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up space-y-4">
              <h3 className="text-lg font-semibold text-[#0A1628]">{t('register')}</h3>
              {[
                { key: 'name', type: 'text', placeholder: 'Azizbek Karimov' },
                { key: 'email', type: 'email', placeholder: 'example@mail.com' },
                { key: 'phone', type: 'tel', placeholder: '+998 90 123 45 67' },
                { key: 'password', type: 'password', placeholder: '••••••••' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-[#0A1628] mb-1.5">{t(field.key as any)}</label>
                  <input type={field.type} value={(form as any)[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 text-sm focus:border-[#14B8A6] transition-colors" placeholder={field.placeholder} />
                </div>
              ))}
              {/* Social login */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-[#94A3B8] text-center mb-3">Yoki ijtimoiy tarmoq orqali</p>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-[#0A1628] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"><Globe className="w-4 h-4 text-red-500" />Google</button>
                  <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-[#0A1628] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4 text-sky-500" />Telegram</button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border border-slate-200 text-[#5A6578] text-sm font-medium hover:bg-slate-50">{t('back')}</button>
                <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl bg-[#14B8A6] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#0D9488]">{t('next')} <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-semibold text-[#0A1628] mb-1">{t('otpVerify')}</h3>
              <p className="text-sm text-[#94A3B8] mb-6">{form.phone} raqamiga kod yuborildi</p>
              <div className="flex gap-2 justify-center mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <input key={i} type="text" maxLength={1} className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-100 focus:border-[#14B8A6] transition-colors" value={otp[i] || ''} onChange={(e) => { const val = e.target.value; setOtp(prev => prev.split('').map((c, j) => j === i ? val : c).join('')); if (val && i < 3) (document.querySelectorAll('input[maxLength="1"]')[i + 1] as HTMLElement)?.focus(); }} />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl border border-slate-200 text-[#5A6578] text-sm font-medium hover:bg-slate-50">{t('back')}</button>
                <button onClick={() => setStep(4)} className="flex-1 py-3 rounded-xl bg-[#14B8A6] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#0D9488]">{t('next')} <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-semibold text-[#0A1628] mb-6">{t('confirm')}</h3>
              <div className="bg-slate-50 rounded-xl p-5 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[#94A3B8]">{t('fullName')}</span><span className="font-medium text-[#0A1628]">{form.name}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">Email</span><span className="font-medium text-[#0A1628]">{form.email}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">{t('phone')}</span><span className="font-medium text-[#0A1628]">{form.phone}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">{t('selectRole')}</span><span className="font-medium text-[#0A1628]">{t(selected as any)}</span></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(3)} className="px-6 py-3 rounded-xl border border-slate-200 text-[#5A6578] text-sm font-medium hover:bg-slate-50">{t('back')}</button>
                <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl bg-[#14B8A6] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#0D9488]">{t('submit')} <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {showSuccess && (
            <div className="text-center animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-[#14B8A6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A1628]">{t('success')}</h3>
              <p className="mt-2 text-sm text-[#5A6578]">{t('welcome')}, {form.name}!</p>
              <p className="mt-4 text-xs text-[#94A3B8]">Avtomatik yo'naltirilmoqda...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
