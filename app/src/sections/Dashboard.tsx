import { useState } from 'react';
import { Plane, Hotel, Car, UserCheck, Bot, Calendar, MapPin, Users, CheckCircle2, Clock, ChevronRight, LogOut, Sparkles, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

interface ChatMsg { role: 'user' | 'assistant'; text: string; }

export default function Dashboard() {
  const { t } = useLanguage();
  const { user, bookings, logout, setCurrentPage, setActiveSection } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [aiOpen, setAiOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([{ role: 'assistant', text: t('aiWelcome') }]);
  const [chatInput, setChatInput] = useState('');

  const sidebar = [
    { id: 'overview', icon: Calendar, label: t('upcomingTrips') },
    { id: 'avia', icon: Plane, label: t('aviabilet') },
    { id: 'hotels', icon: Hotel, label: t('hotelsTitle') },
    { id: 'transport', icon: Car, label: t('transportTitle') },
    { id: 'guide', icon: UserCheck, label: t('guidesTitle') },
    { id: 'ai', icon: Bot, label: t('aiTitle') },
  ];

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setChatMsgs(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      const replies = [
        'Sizga qanday yordam bera olaman?',
        'Samarqand ajoyib tanlov! Registon, Go\'ri Amiq bor.',
        'Buxoro bo\'ylab 3 kunlik tur narxi $299 dan boshlanadi.',
        'Volontyor sifatida ro\'yxatdan o\'tish mumkin.',
      ];
      setChatMsgs(prev => [...prev, { role: 'assistant', text: replies[Math.floor(Math.random() * replies.length)] }]);
    }, 800);
  };

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div className="space-y-6 animate-fade-in-up">
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1e3a5f] rounded-2xl p-6 sm:p-8 text-white">
            <h2 className="text-2xl font-bold">{t('welcome')}, {user?.name?.split(' ')[0]}!</h2>
            <p className="mt-2 text-white/50 text-sm">{t('dashboardTitle')}</p>
            <div className="mt-4">
              <span className="px-3 py-1 rounded-full bg-[#14B8A6]/20 text-[#14B8A6] text-xs font-semibold">{user?.role === 'tourist' ? t('tourist') : user?.role === 'local' ? t('local') : user?.role === 'student' ? t('student') : t('business')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: t('upcomingTrips'), value: bookings.length, icon: Calendar, color: 'bg-[#14B8A6]/10 text-[#14B8A6]' },
              { label: t('guides'), value: '5', icon: UserCheck, color: 'bg-emerald-50 text-emerald-600' },
              { label: t('hotelsTitle'), value: '3', icon: Hotel, color: 'bg-sky-50 text-sky-600' },
              { label: t('avia'), value: '2', icon: Plane, color: 'bg-amber-50 text-amber-600' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
                  <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}><Icon className="w-5 h-5" /></div>
                  <p className="mt-3 text-2xl font-bold text-[#0A1628]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                  <p className="text-xs text-[#94A3B8]">{s.label}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-[#0A1628]">{t('myBookings')}</h3>
              <span className="text-xs text-[#94A3B8]">{bookings.length} ta</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">{t('region')}</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">{t('selectDate')}</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">{t('selectGuide')}</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">{t('participants')}</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">{t('confirm')}</th>
                </tr></thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#14B8A6]" /><span className="text-sm text-[#0A1628]">{b.destination}</span></div></td>
                      <td className="px-4 py-3 text-sm text-[#5A6578]">{b.date}</td>
                      <td className="px-4 py-3 text-sm text-[#5A6578]">{b.guide || '-'}</td>
                      <td className="px-4 py-3"><div className="flex items-center gap-1"><Users className="w-3 h-3 text-[#94A3B8]" /><span className="text-sm text-[#5A6578]">{b.participants}</span></div></td>
                      <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{b.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}{b.status === 'confirmed' ? t('confirmed') : t('pending')}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="animate-fade-in-up">
        <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
            {(() => { const item = sidebar.find(i => i.id === activeTab); const Icon = item?.icon || Calendar; return <Icon className="w-8 h-8 text-[#14B8A6]" />; })()}
          </div>
          <h3 className="text-lg font-semibold text-[#0A1628]">{sidebar.find(i => i.id === activeTab)?.label}</h3>
          <p className="mt-2 text-sm text-[#5A6578]">Bu bo'lim tez orada mavjud bo'ladi.</p>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F8FAFC] pt-20">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
        <aside className="w-full lg:w-64 bg-white border-r border-slate-100 flex-shrink-0">
          <div className="p-4 lg:p-5">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mb-3"><span className="text-lg font-bold text-[#14B8A6]">{user?.name?.charAt(0) || 'U'}</span></div>
              <h3 className="font-semibold text-[#0A1628] text-sm">{user?.name}</h3>
              <p className="text-xs text-[#94A3B8]">{user?.email}</p>
            </div>
            <nav className="space-y-1">
              {sidebar.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === item.id ? 'bg-[#14B8A6]/10 text-[#14B8A6] font-semibold' : 'text-[#5A6578] hover:bg-slate-50'}`}>
                    <Icon className="w-4 h-4 flex-shrink-0" /><span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-2">
              <button onClick={() => { setCurrentPage('home'); setActiveSection('home'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#5A6578] hover:bg-slate-50 transition-colors"><Sparkles className="w-4 h-4" />{t('siteName')}</button>
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"><LogOut className="w-4 h-4" />{t('logout')}</button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{renderContent()}</main>
      </div>

      {/* AI FAB */}
      <button onClick={() => setAiOpen(!aiOpen)} className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/30 flex items-center justify-center hover:bg-[#0D9488] transition-all hover:scale-105 animate-pulse-ring">
        <Bot className="w-6 h-6" />
      </button>

      {aiOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-fade-in-up">
          <div className="px-4 py-3 bg-gradient-to-r from-[#0A1628] to-[#1e3a5f] flex items-center justify-between">
            <div className="flex items-center gap-2"><Bot className="w-5 h-5 text-[#14B8A6]" /><span className="text-white text-sm font-semibold">{t('aiTitle')}</span></div>
            <button onClick={() => setAiOpen(false)} className="text-white/60 hover:text-white"><ArrowLeft className="w-4 h-4" /></button>
          </div>
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {chatMsgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.role === 'user' ? 'bg-[#14B8A6] text-white rounded-br-sm' : 'bg-slate-100 text-[#0A1628] rounded-bl-sm'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t('aiAsk')} className="flex-1 px-3 py-2 rounded-full border border-slate-200 text-sm focus:border-[#14B8A6] transition-colors" />
              <button onClick={handleSend} className="w-9 h-9 rounded-full bg-[#14B8A6] text-white flex items-center justify-center hover:bg-[#0D9488] flex-shrink-0"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
