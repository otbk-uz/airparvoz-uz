import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ChatMsg { role: 'user' | 'assistant'; text: string; }

const suggestions = [
  'Samarqandga eng arzon aviabilet top',
  'Oilaviy tur reja tuz',
  'Buxoroda qayerga borish kerak?',
  'Xiva sayohati uchun gid kerak',
];

export default function AIChat() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: 'assistant', text: t('aiWelcome') }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        'Samarqandga 15-iyundan boshlab $89 dan aviabiletlar mavjud. Bron qilasizmi?',
        'Oilaviy tur uchun Samarqand-Buxoro yo\'nalishi tavsiya etiladi. 5 kun, $499.',
        'Buxoroda mustaqillik maydoni, Ark qal\'asi va Lyabi Xovuz majmuasi diqqatga sazovor.',
        'Xiva uchun Jasur Toshkentov tavsiya etiladi. 4.7 reyting, sahro ekskursiyalari mutaxassisi.',
        'Eng arzon variant: poyezd bilan Toshkent-Samarqand, $25 dan boshlanadi.',
      ];
      setMessages(prev => [...prev, { role: 'assistant', text: responses[Math.floor(Math.random() * responses.length)] }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestion = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsTyping(true);
    setTimeout(() => {
      const responses: Record<string, string> = {
        'Samarqandga eng arzon aviabilet top': 'Samarqandga 15-iyundan boshlab Uzbekistan Airways $89 dan, Qanot Sharq $95 dan. Bron qilasizmi?',
        'Oilaviy tur reja tuz': 'Oilaviy tur: 1-kun Registon, 2-kun Go\'ri Amiq, 3-kun Shahrisabz. Narx: $499 (4 kishi uchun).',
        'Buxoroda qayerga borish kerak?': 'Buxoroda: Ark qal\'asi, Lyabi Xovuz, Chor Minor, Kalyon minora va Toqi Zargaron bozori.',
        'Xiva sayohati uchun gid kerak': 'Xiva uchun Jasur Toshkentov (4.7★) tavsiya etiladi. Cho\'l ekoturlar mutaxassisi.',
      };
      setMessages(prev => [...prev, { role: 'assistant', text: responses[text] || 'Sizning savolingiz bo\'yicha yordam beraman!' }]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/30 flex items-center justify-center hover:bg-[#0D9488] hover:scale-110 transition-all duration-300 animate-pulse-ring"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-scale-in" style={{ maxHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-[#0A1628] to-[#1e3a5f] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#14B8A6]/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#14B8A6]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{t('aiTitle')}</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/50 text-[10px]">Online</span>
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              </div>
            )}
            <div className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#14B8A6] text-white rounded-br-sm' : 'bg-slate-100 text-[#0A1628] rounded-bl-sm'}`}>
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center ml-2 flex-shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-[#5A6578]" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-[#14B8A6]/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
            </div>
            <div className="bg-slate-100 rounded-xl px-4 py-3 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="px-4 pb-2 flex flex-wrap gap-2">
        {suggestions.slice(0, 2).map((s, i) => (
          <button key={i} onClick={() => handleSuggestion(s)} className="px-3 py-1.5 rounded-full border border-slate-200 text-[10px] text-[#5A6578] hover:border-[#14B8A6] hover:text-[#14B8A6] transition-colors whitespace-nowrap">
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('aiAsk')}
            className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-sm focus:border-[#14B8A6] transition-colors"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-[#14B8A6] text-white flex items-center justify-center hover:bg-[#0D9488] transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
