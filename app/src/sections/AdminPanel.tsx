import { useState } from 'react';
import { Users, Calendar, CreditCard, Building2, Hotel, BarChart3, ArrowLeft, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

const adminTabs = [
  { id: 'users', icon: Users, label: 'users' },
  { id: 'bookings', icon: Calendar, label: 'bookings' },
  { id: 'payments', icon: CreditCard, label: 'payments' },
  { id: 'tour-firms', icon: Building2, label: 'tourFirms' },
  { id: 'hotels', icon: Hotel, label: 'hotels' },
  { id: 'analytics', icon: BarChart3, label: 'analytics' },
];

const mockUsers = [
  { id: 1, name: 'Azizbek Karimov', email: 'aziz@mail.com', role: 'tourist', status: 'active' },
  { id: 2, name: 'Gulnora Rahimova', email: 'gulnora@mail.com', role: 'business', status: 'active' },
  { id: 3, name: 'Jasur Toshkentov', email: 'jasur@mail.com', role: 'local', status: 'pending' },
];

const mockBookings = [
  { id: 'B001', user: 'Azizbek Karimov', destination: 'Samarqand', date: '2026-06-15', amount: '$499', status: 'confirmed' },
  { id: 'B002', user: 'Gulnora Rahimova', destination: 'Xiva', date: '2026-07-20', amount: '$699', status: 'pending' },
  { id: 'B003', user: 'Jasur Toshkentov', destination: 'Buxoro', date: '2026-08-10', amount: '$299', status: 'confirmed' },
];

export default function AdminPanel() {
  const { t } = useLanguage();
  const { setCurrentPage, setActiveSection } = useApp();
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
              <h3 className="font-semibold text-[#0A1628]">{t('users')}</h3>
              <div className="flex items-center gap-2">
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" /><input type="text" placeholder="Qidirish..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm w-48 focus:border-[#14B8A6]" /></div>
                <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50"><Filter className="w-4 h-4 text-[#5A6578]" /></button>
              </div>
            </div>
            <table className="w-full">
              <thead><tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">ID</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Ism</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Email</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Rol</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Status</th>
              </tr></thead>
              <tbody>
                {mockUsers.map((u) => (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-[#5A6578]">#{u.id}</td>
                    <td className="px-6 py-3 text-sm font-medium text-[#0A1628]">{u.name}</td>
                    <td className="px-6 py-3 text-sm text-[#5A6578]">{u.email}</td>
                    <td className="px-6 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-[#5A6578]">{u.role}</span></td>
                    <td className="px-6 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${u.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{u.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}{u.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'bookings':
        return (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-semibold text-[#0A1628]">{t('bookings')}</h3></div>
            <table className="w-full">
              <thead><tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Bron ID</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Foydalanuvchi</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Yo'nalish</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Sana</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Summa</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase">Status</th>
              </tr></thead>
              <tbody>
                {mockBookings.map((b) => (
                  <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-[#0A1628]">{b.id}</td>
                    <td className="px-6 py-3 text-sm text-[#5A6578]">{b.user}</td>
                    <td className="px-6 py-3 text-sm text-[#0A1628]">{b.destination}</td>
                    <td className="px-6 py-3 text-sm text-[#5A6578]">{b.date}</td>
                    <td className="px-6 py-3 text-sm font-semibold text-[#14B8A6]">{b.amount}</td>
                    <td className="px-6 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{b.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'analytics':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
            {[
              { label: t('users'), value: '1,247', color: 'bg-sky-50 text-sky-600' },
              { label: t('bookings'), value: '3,892', color: 'bg-emerald-50 text-emerald-600' },
              { label: t('payments'), value: '$482K', color: 'bg-amber-50 text-amber-600' },
              { label: t('tourFirms'), value: '48', color: 'bg-rose-50 text-rose-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-100">
                <p className="text-xs text-[#94A3B8] uppercase tracking-wider">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-[#0A1628]" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600"><CheckCircle2 className="w-3 h-3" />+12% o'tgan oyga nisbatan</div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl border border-slate-100 p-8 text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
              {(() => { const item = adminTabs.find(i => i.id === activeTab); const Icon = item?.icon || BarChart3; return <Icon className="w-8 h-8 text-[#14B8A6]" />; })()}
            </div>
            <h3 className="text-lg font-semibold text-[#0A1628]">{adminTabs.find(i => i.id === activeTab)?.label}</h3>
            <p className="mt-2 text-sm text-[#5A6578]">Bu bo'lim tez orada to'liq ishga tushiriladi.</p>
          </div>
        );
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F8FAFC] pt-20">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
        <aside className="w-full lg:w-64 bg-white border-r border-slate-100 flex-shrink-0">
          <div className="p-4 lg:p-5">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#0A1628]" style={{ fontFamily: "'Playfair Display', serif" }}>{t('adminTitle')}</h3>
              <p className="text-xs text-[#94A3B8] mt-1">Super Admin</p>
            </div>
            <nav className="space-y-1">
              {adminTabs.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === item.id ? 'bg-[#14B8A6]/10 text-[#14B8A6] font-semibold' : 'text-[#5A6578] hover:bg-slate-50'}`}>
                    <Icon className="w-4 h-4 flex-shrink-0" /><span className="truncate">{t(item.label)}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button onClick={() => { setCurrentPage('home'); setActiveSection('home'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#5A6578] hover:bg-slate-50 transition-colors"><ArrowLeft className="w-4 h-4" />{t('siteName')}</button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{renderContent()}</main>
      </div>
    </section>
  );
}
