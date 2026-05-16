import { useState } from 'react';
import { Users, Calendar, CreditCard, Building2, Hotel, BarChart3, ArrowLeft, CheckCircle2, Clock, Search, Filter, Trash2, Edit2, ShieldCheck, MoreVertical, TrendingUp, TrendingDown, DollarSign, MapPin } from 'lucide-react';
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
  { id: 1, name: 'Azizbek Karimov', email: 'aziz@mail.com', role: 'tourist', status: 'active', joined: '2026-05-10' },
  { id: 2, name: 'Gulnora Rahimova', email: 'gulnora@mail.com', role: 'business', status: 'active', joined: '2026-05-12' },
  { id: 3, name: 'Jasur Toshkentov', email: 'jasur@mail.com', role: 'local', status: 'pending', joined: '2026-05-14' },
  { id: 4, name: 'Malika Umarova', email: 'malika@mail.com', role: 'student', status: 'active', joined: '2026-05-15' },
];

const mockBookings = [
  { id: 'B001', user: 'Azizbek Karimov', destination: 'Samarqand', date: '2026-06-15', amount: '$499', status: 'confirmed' },
  { id: 'B002', user: 'Gulnora Rahimova', destination: 'Xiva', date: '2026-07-20', amount: '$699', status: 'pending' },
  { id: 'B003', user: 'Jasur Toshkentov', destination: 'Buxoro', date: '2026-08-10', amount: '$299', status: 'confirmed' },
];

const mockPayments = [
  { id: 'P1024', user: 'Azizbek Karimov', method: 'Visa', amount: '$499', date: '2026-05-14', status: 'completed' },
  { id: 'P1025', user: 'Gulnora Rahimova', method: 'Humo', amount: '$699', date: '2026-05-15', status: 'completed' },
  { id: 'P1026', user: 'Jasur Toshkentov', method: 'UzCard', amount: '$299', date: '2026-05-16', status: 'pending' },
];

const mockFirms = [
  { id: 1, name: 'Air Parvoz Tour', manager: 'Dilshod Akramov', rating: 4.9, verified: true, sales: '$12k' },
  { id: 2, name: 'Sky Travels', manager: 'Sabina Usmanova', rating: 4.7, verified: true, sales: '$8k' },
  { id: 3, name: 'Silk Road Path', manager: 'Kamoliddin Ali', rating: 4.2, verified: false, sales: '$2k' },
];

const mockHotels = [
  { id: 1, name: 'Registan Plaza', location: 'Samarqand', rating: 5.0, status: 'available', price: '$85/tun' },
  { id: 2, name: 'Bukhara Palace', location: 'Buxoro', rating: 4.8, status: 'fully_booked', price: '$120/tun' },
  { id: 3, name: 'Orient Star', location: 'Xiva', rating: 4.6, status: 'available', price: '$65/tun' },
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
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="font-semibold text-[#0A1628]">{t('users')}</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input type="text" placeholder="Qidirish..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm w-full sm:w-48 focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] outline-none" />
                </div>
                <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50"><Filter className="w-4 h-4 text-[#5A6578]" /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead><tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Foydalanuvchi</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Amallar</th>
                </tr></thead>
                <tbody>
                  {mockUsers.map((u) => (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-[#5A6578]">#{u.id}</td>
                      <td className="px-6 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#0A1628]">{u.name}</span>
                          <span className="text-xs text-[#94A3B8]">{u.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${u.role === 'tourist' ? 'bg-sky-50 text-sky-600' : 'bg-slate-100 text-[#5A6578]'}`}>{u.role}</span></td>
                      <td className="px-6 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${u.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{u.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}{u.status}</span></td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-[#14B8A6] hover:bg-slate-50"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-semibold text-[#0A1628]">{t('bookings')}</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead><tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Bron ID</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Foydalanuvchi</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Yo'nalish</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Summa</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Amallar</th>
                </tr></thead>
                <tbody>
                  {mockBookings.map((b) => (
                    <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm font-medium text-[#0A1628]">{b.id}</td>
                      <td className="px-6 py-3 text-sm text-[#5A6578]">{b.user}</td>
                      <td className="px-6 py-3 text-sm text-[#0A1628]">{b.destination}</td>
                      <td className="px-6 py-3 text-sm font-semibold text-[#14B8A6]">{b.amount}</td>
                      <td className="px-6 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{b.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}{b.status}</span></td>
                      <td className="px-6 py-3 text-right">
                        <button className="text-xs text-[#14B8A6] font-medium hover:underline">Ko'rish</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-semibold text-[#0A1628]">{t('payments')}</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead><tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Tranzaksiya ID</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Foydalanuvchi</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Usul</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Summa</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Status</th>
                </tr></thead>
                <tbody>
                  {mockPayments.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm font-medium text-[#0A1628]">{p.id}</td>
                      <td className="px-6 py-3 text-sm text-[#5A6578]">{p.user}</td>
                      <td className="px-6 py-3 text-sm text-[#0A1628]">{p.method}</td>
                      <td className="px-6 py-3 text-sm font-semibold text-[#0A1628]">{p.amount}</td>
                      <td className="px-6 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'tour-firms':
        return (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-[#0A1628]">{t('tourFirms')}</h3>
              <button className="text-xs bg-[#14B8A6] text-white px-3 py-1.5 rounded-lg font-medium">+ Yangi firma</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead><tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Kompaniya</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Rahbar</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Reyting</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Sotuvlar</th>
                  <th className="px-6 py-3 text-right text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Status</th>
                </tr></thead>
                <tbody>
                  {mockFirms.map((f) => (
                    <tr key={f.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-[#14B8A6]">{f.name.charAt(0)}</div>
                        <span className="text-sm font-medium text-[#0A1628]">{f.name}</span>
                      </td>
                      <td className="px-6 py-3 text-sm text-[#5A6578]">{f.manager}</td>
                      <td className="px-6 py-3 text-sm text-[#0A1628]">{f.rating}</td>
                      <td className="px-6 py-3 text-sm font-bold text-[#14B8A6]">{f.sales}</td>
                      <td className="px-6 py-3 text-right">
                        {f.verified ? <span className="inline-flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase"><ShieldCheck className="w-3.5 h-3.5" /> Tasdiqlangan</span> : <button className="text-[10px] font-bold text-[#14B8A6] border border-[#14B8A6] px-2 py-0.5 rounded hover:bg-[#14B8A6] hover:text-white transition-all uppercase">Tasdiqlash</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'hotels':
        return (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-[#0A1628]">{t('hotels')}</h3>
              <button className="text-xs bg-[#14B8A6] text-white px-3 py-1.5 rounded-lg font-medium">+ Yangi mehmonxona</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-6">
              {mockHotels.map((h) => (
                <div key={h.id} className="group relative bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-[#14B8A6]/10 transition-colors">
                      <Hotel className="w-6 h-6 text-[#14B8A6]" />
                    </div>
                    <button className="p-2 rounded-lg text-slate-300 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                  <h4 className="font-bold text-[#0A1628]">{h.name}</h4>
                  <p className="text-xs text-[#94A3B8] flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{h.location}</p>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#14B8A6]">{h.price}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${h.status === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{h.status === 'available' ? 'Bo\'sh' : 'Band'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: t('users'), value: '1,247', change: '+12%', up: true, icon: Users, color: 'text-sky-600' },
                { label: t('bookings'), value: '3,892', change: '+8%', up: true, icon: Calendar, color: 'text-emerald-600' },
                { label: t('payments'), value: '$482K', change: '-2%', up: false, icon: DollarSign, color: 'text-amber-600' },
                { label: t('tourFirms'), value: '48', change: '+5', up: true, icon: Building2, color: 'text-rose-600' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white rounded-xl p-5 border border-slate-100">
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}><Icon className="w-5 h-5" /></div>
                      <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-semibold">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-[#0A1628]" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-100">
                <h4 className="font-bold text-[#0A1628] mb-6 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#14B8A6]" />Oylik sotuvlar</h4>
                <div className="h-48 flex items-end justify-between gap-2">
                  {[45, 65, 55, 85, 75, 95, 80].map((h, i) => (
                    <div key={i} className="group relative flex-1 flex flex-col items-center">
                      <div className="absolute -top-8 bg-[#0A1628] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${h}k</div>
                      <div className="w-full bg-[#14B8A6] rounded-t-lg transition-all duration-500 hover:brightness-110" style={{ height: `${h}%` }}></div>
                      <span className="text-[10px] text-[#94A3B8] mt-2">Sen {i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-100">
                <h4 className="font-bold text-[#0A1628] mb-6 flex items-center gap-2"><Users className="w-4 h-4 text-[#14B8A6]" />Roller bo'yicha ulush</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Sayyohlar', p: 65, color: 'bg-sky-500' },
                    { label: 'Bizneslar', p: 15, color: 'bg-rose-500' },
                    { label: 'Gidlar', p: 12, color: 'bg-emerald-500' },
                    { label: 'Talabalar', p: 8, color: 'bg-amber-500' },
                  ].map((role, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1.5"><span className="text-[#5A6578]">{role.label}</span><span className="font-bold text-[#0A1628]">{role.p}%</span></div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${role.color} rounded-full transition-all duration-1000`} style={{ width: `${role.p}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F8FAFC] pt-20">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
        <aside className="w-full lg:w-64 bg-white border-r border-slate-100 flex-shrink-0">
          <div className="p-4 lg:p-5">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#0A1628]" style={{ fontFamily: "'Playfair Display', serif" }}>{t('adminTitle')}</h3>
              <p className="text-xs text-[#94A3B8] mt-1 uppercase tracking-tighter font-bold">Boshqaruv Paneli</p>
            </div>
            <nav className="space-y-1">
              {adminTabs.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === item.id ? 'bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20 font-semibold translate-x-1' : 'text-[#5A6578] hover:bg-slate-50'}`}>
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-50/30">{renderContent()}</main>
      </div>
    </section>
  );
}
