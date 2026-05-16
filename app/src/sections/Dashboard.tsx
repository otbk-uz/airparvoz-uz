import { useState, useRef, useEffect } from 'react';
import { Plane, Hotel, Car, UserCheck, Bot, Calendar, MapPin, Users, CheckCircle2, Clock, ChevronRight, LogOut, Sparkles, ArrowLeft, Send, Search, Ticket, Heart } from 'lucide-react';
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
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMsgs]);

  const sidebar = [
    { id: 'overview', icon: Calendar, label: t('upcomingTrips') },
    { id: 'avia', icon: Ticket, label: t('aviabilet') },
    { id: 'hotels', icon: Hotel, label: t('hotelsTitle') },
    { id: 'transport', icon: Car, label: t('transportTitle') },
    { id: 'guide', icon: UserCheck, label: t('guidesTitle') },
    { id: 'ai', icon: Bot, label: t('aiTitle') },
  ];

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMsgs(prev => [...prev, { role: 'user', text: msg }]);
    setChatInput('');
    
    setTimeout(() => {
      let reply = "Sizni tushunmadim, iltimos qaytadan so'rang.";
      const lowMsg = msg.toLowerCase();
      
      if (lowMsg.includes('avia') || lowMsg.includes('parvoz')) {
        reply = "Samarqandga eng arzon reyslar Juma kunlari bo'ladi. Narxi $45 dan boshlanadi.";
      } else if (lowMsg.includes('mehmonxona') || lowMsg.includes('hotel')) {
        reply = "Buxorodagi 'Bukhara Palace' mehmonxonasi hozirda 15% chegirmada.";
      } else if (lowMsg.includes('salom') || lowMsg.includes('assalom')) {
        reply = "Assalomu alaykum! Sayohat bo'yicha qanday yordam bera olaman?";
      } else if (lowMsg.includes('samarqand')) {
        reply = "Samarqandda Registon va Go'ri Amirni ko'rishni tavsiya qilaman.";
      }
      
      setChatMsgs(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 800);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-gradient-to-br from-[#0A1628] via-[#1e3a5f] to-[#14B8A6] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Plane className="w-48 h-48 -rotate-12" /></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{t('welcome')}, {user?.name?.split(' ')[0]}!</h2>
                <p className="mt-2 text-white/70 text-sm max-w-md">{t('dashboardTitle')}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">{user?.role} Account</span>
                  <span className="px-4 py-1.5 rounded-full bg-[#14B8A6] text-white text-xs font-bold uppercase tracking-wider">Verified User</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: t('upcomingTrips'), value: bookings.length, icon: Calendar, color: 'bg-emerald-50 text-emerald-600' },
                { label: t('guides'), value: '12', icon: UserCheck, color: 'bg-amber-50 text-amber-600' },
                { label: t('hotelsTitle'), value: '4', icon: Hotel, color: 'bg-sky-50 text-sky-600' },
                { label: t('avia'), value: '2', icon: Plane, color: 'bg-rose-50 text-rose-600' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all cursor-default group">
                    <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform`}><Icon className="w-6 h-6" /></div>
                    <p className="mt-4 text-3xl font-bold text-[#0A1628]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                    <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">{s.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-[#0A1628] text-lg">{t('myBookings')}</h3>
                <button className="text-xs text-[#14B8A6] font-bold hover:underline">Hammasini ko'rish</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead><tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{t('region')}</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{t('selectDate')}</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{t('selectGuide')}</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{t('status')}</th>
                  </tr></thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center"><MapPin className="w-4 h-4 text-[#14B8A6]" /></div><span className="text-sm font-semibold text-[#0A1628]">{b.destination}</span></div></td>
                        <td className="px-6 py-4 text-sm text-[#5A6578] font-medium">{b.date}</td>
                        <td className="px-6 py-4 text-sm text-[#5A6578]">{b.guide || 'Tayinlanmagan'}</td>
                        <td className="px-6 py-4"><span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{b.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}{b.status === 'confirmed' ? t('confirmed') : t('pending')}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'avia':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between"><h3 className="text-xl font-bold text-[#0A1628]">Mening parvozlarim</h3><button className="text-sm bg-[#14B8A6] text-white px-4 py-2 rounded-xl font-bold">+ Chipta qidirish</button></div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { from: 'TAS', to: 'SKD', date: '22 May', time: '07:30', price: '$45', status: 'Upcoming' },
                { from: 'BHK', to: 'TAS', date: '15 Apr', time: '18:45', price: '$60', status: 'Completed' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#0A1628]">{f.from}</p>
                      <p className="text-xs text-[#94A3B8]">Toshkent</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Plane className="w-5 h-5 text-[#14B8A6]" />
                      <div className="w-24 h-[2px] bg-slate-100 relative"><div className="absolute inset-0 bg-[#14B8A6] w-1/2"></div></div>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#0A1628]">{f.to}</p>
                      <p className="text-xs text-[#94A3B8]">Samarqand</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#0A1628]">{f.date}</p>
                      <p className="text-xs text-[#94A3B8]">{f.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-[#14B8A6]">{f.price}</p>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${f.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{f.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'hotels':
        return (
          <div className="space-y-6 animate-fade-in-up">
             <div className="flex items-center justify-between"><h3 className="text-xl font-bold text-[#0A1628]">Saqlangan mehmonxonalar</h3></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { name: 'Registan Plaza', loc: 'Samarqand', price: '$85', rating: 4.9 },
                 { name: 'Bukhara Palace', loc: 'Buxoro', price: '$120', rating: 4.7 },
               ].map((h, i) => (
                 <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 group hover:shadow-xl transition-all">
                   <div className="h-40 bg-slate-100 relative flex items-center justify-center"><Hotel className="w-12 h-12 text-[#14B8A6]/20" /><button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-rose-500"><Heart className="w-4 h-4 fill-rose-500" /></button></div>
                   <div className="p-5">
                     <h4 className="font-bold text-[#0A1628]">{h.name}</h4>
                     <p className="text-xs text-[#94A3B8] flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{h.loc}</p>
                     <div className="mt-4 flex items-center justify-between">
                       <span className="text-sm font-bold text-[#14B8A6]">{h.price}/tun</span>
                       <button className="text-xs font-bold bg-[#0A1628] text-white px-3 py-1.5 rounded-lg">Band qilish</button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        );

      default:
        return (
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                {(() => { const item = sidebar.find(i => i.id === activeTab); const Icon = item?.icon || Calendar; return <Icon className="w-10 h-10 text-[#14B8A6]" />; })()}
              </div>
              <h3 className="text-2xl font-bold text-[#0A1628]">{sidebar.find(i => i.id === activeTab)?.label}</h3>
              <p className="mt-3 text-slate-500 max-w-sm mx-auto">Sizning {sidebar.find(i => i.id === activeTab)?.label.toLowerCase()} bo'yicha ma'lumotlaringiz tez orada shu yerda aks etadi.</p>
              <button className="mt-8 px-8 py-3 rounded-2xl bg-[#0A1628] text-white font-bold hover:bg-[#1e293b] transition-all">Xizmatlarni ko'rish</button>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F8FAFC] pt-20">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
        <aside className="w-full lg:w-72 bg-white border-r border-slate-100 flex-shrink-0">
          <div className="p-6">
            <div className="mb-8 p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 transform rotate-3 group-hover:rotate-0 transition-transform"><span className="text-2xl font-black text-[#14B8A6]">{user?.name?.charAt(0) || 'U'}</span></div>
              <h3 className="font-bold text-[#0A1628] text-sm truncate">{user?.name}</h3>
              <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider mt-0.5">{user?.email}</p>
            </div>
            <nav className="space-y-1">
              {sidebar.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all ${activeTab === item.id ? 'bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20 font-bold translate-x-1' : 'text-[#5A6578] hover:bg-slate-50 font-medium'}`}>
                    <Icon className="w-5 h-5 flex-shrink-0" /><span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-10 pt-8 border-t border-slate-100 space-y-2">
              <button onClick={() => { setCurrentPage('home'); setActiveSection('home'); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-[#5A6578] font-medium hover:bg-slate-50 transition-colors"><Sparkles className="w-5 h-5" />{t('siteName')}</button>
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-red-500 font-bold hover:bg-red-50 transition-colors"><LogOut className="w-5 h-5" />{t('logout')}</button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto bg-slate-50/20">{renderContent()}</main>
      </div>

      {/* AI FAB */}
      <button onClick={() => setAiOpen(!aiOpen)} className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-3xl bg-[#14B8A6] text-white shadow-2xl shadow-[#14B8A6]/40 flex items-center justify-center hover:bg-[#0D9488] transition-all hover:scale-110 hover:-rotate-3 animate-pulse-ring">
        <Bot className="w-7 h-7" />
      </button>

      {/* AI Sidebar Chat */}
      {aiOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-fade-in-up">
          <div className="px-6 py-5 bg-[#0A1628] flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-2xl bg-[#14B8A6]/20 flex items-center justify-center"><Bot className="w-6 h-6 text-[#14B8A6]" /></div><div><span className="text-white text-sm font-bold block">{t('aiTitle')}</span><span className="text-[#14B8A6] text-[10px] font-bold uppercase tracking-widest">Online</span></div></div>
            <button onClick={() => setAiOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"><X className="w-4 h-4" /></button>
          </div>
          <div className="h-96 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {chatMsgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#14B8A6] text-white rounded-br-sm shadow-md' : 'bg-slate-100 text-[#0A1628] rounded-bl-sm border border-slate-200'}`}>{m.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="relative flex items-center">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t('aiAsk')} className="w-full pl-5 pr-14 py-4 rounded-2xl bg-white border border-slate-200 text-sm focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] outline-none transition-all shadow-sm" />
              <button onClick={handleSend} className="absolute right-2 w-11 h-11 rounded-xl bg-[#14B8A6] text-white flex items-center justify-center hover:bg-[#0D9488] shadow-lg shadow-[#14B8A6]/20 transition-all active:scale-90"><Send className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
