import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'uz' | 'ru' | 'en';

interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const translations: Translations = {
  siteName: { uz: 'AIRPARVOZ.UZ', ru: 'AIRPARVOZ.UZ', en: 'AIRPARVOZ.UZ' },
  searchPlaceholder: { uz: 'Qayerga bormoqchisiz?', ru: 'Куда хотите поехать?', en: 'Where to?' },
  login: { uz: 'Kirish', ru: 'Вход', en: 'Login' },
  register: { uz: "Ro'yxatdan o'tish", ru: 'Регистрация', en: 'Register' },
  logout: { uz: 'Chiqish', ru: 'Выход', en: 'Logout' },

  // Hero
  heroTitle: { uz: "O'zbekistonni\nkashf eting", ru: 'Откройте\nУзбекистан', en: 'Discover\nUzbekistan' },
  heroCta: { uz: 'Sayohatni boshlash', ru: 'Начать путешествие', en: 'Start Journey' },

  // Nav
  aboutUs: { uz: 'Biz haqimizda', ru: 'О нас', en: 'About Us' },
  services: { uz: 'Xizmatlar', ru: 'Услуги', en: 'Services' },
  explore: { uz: 'Kashf etish', ru: 'Исследовать', en: 'Explore' },

  // Transport
  transportTitle: { uz: 'Transport xizmatlari', ru: 'Транспортные услуги', en: 'Transport Services' },
  transportSubtitle: { uz: 'Avia, temir yo\'l, avtobus va mashina ijarasi', ru: 'Авиа, ж/д, автобус и аренда авто', en: 'Flights, trains, buses & car rentals' },
  aviabilet: { uz: 'Aviabiletlar', ru: 'Авиабилеты', en: 'Flight Tickets' },
  poyezd: { uz: 'Poyezd biletlari', ru: 'Ж/Д билеты', en: 'Train Tickets' },
  avtobus: { uz: 'Avtobus yo\'nalishlari', ru: 'Автобусные маршруты', en: 'Bus Routes' },
  mashina: { uz: 'Mashina ijarasi', ru: 'Аренда авто', en: 'Car Rental' },
  aviaDesc: { uz: 'O\'zbekiston ichki va xalqaro parvozlar', ru: 'Внутренние и международные рейсы', en: 'Domestic & international flights' },
  poyezdDesc: { uz: 'Tez va qulay poyezd yo\'nalishlari', ru: 'Быстрые и удобные ж/д маршруты', en: 'Fast & comfortable train routes' },
  avtobusDesc: { uz: 'Shaharlararo avtobus qatnovi', ru: 'Междугородние автобусы', en: 'Intercity bus services' },
  mashinaDesc: { uz: 'Qulay narxlarda mashina ijarasi', ru: 'Аренда авто по выгодным ценам', en: 'Car rental at affordable rates' },

  // Hotels
  hotelsTitle: { uz: 'Mehmonxonalar', ru: 'Отели', en: 'Hotels' },
  hotelsSubtitle: { uz: 'Eng yaxshi mehmonxonalar O\'zbekistonda', ru: 'Лучшие отели Узбекистана', en: 'Best hotels in Uzbekistan' },
  filterPrice: { uz: 'Narx', ru: 'Цена', en: 'Price' },
  filterRating: { uz: 'Reyting', ru: 'Рейтинг', en: 'Rating' },
  filterLocation: { uz: 'Joylashuv', ru: 'Расположение', en: 'Location' },
  perNight: { uz: '/ tunda', ru: '/ ночь', en: '/ night' },

  // Tour Companies
  tourFirmsTitle: { uz: 'Tur firmalar', ru: 'Турфирмы', en: 'Tour Companies' },
  tourFirmsSubtitle: { uz: 'Sizning sayohatingiz uchun professional reja', ru: 'Профессиональный план для вашего путешествия', en: 'Professional plans for your journey' },
  viewTours: { uz: 'Turlarini ko\'rish', ru: 'Смотреть туры', en: 'View Tours' },

  // 360 Tours
  virtualToursTitle: { uz: '360° Virtual Sayohat', ru: '360° Виртуальный тур', en: '360° Virtual Tours' },
  virtualToursSubtitle: { uz: 'Uyda turib O\'zbekistonni kashf eting', ru: 'Откройте Узбекистан не выходя из дома', en: 'Explore Uzbekistan from home' },

  // Guides
  guidesTitle: { uz: 'Gidlar va Volontyorlar', ru: 'Гиды и Волонтеры', en: 'Guides & Volunteers' },
  guidesSubtitle: { uz: 'Professional gidlar bilan tanishing', ru: 'Познакомьтесь с профессиональными гидами', en: 'Meet professional guides' },
  yearsExp: { uz: 'yil tajriba', ru: 'лет опыта', en: 'years exp' },
  bookGuide: { uz: 'Bron qilish', ru: 'Забронировать', en: 'Book Now' },

  // AI
  aiTitle: { uz: 'AI Yordamchi', ru: 'AI Помощник', en: 'AI Assistant' },
  aiSubtitle: { uz: 'Sun\'iy intellekt sayohatingizni rejalashtiradi', ru: 'ИИ спланирует ваше путешествие', en: 'AI plans your journey' },
  aiAsk: { uz: 'Savolingizni yozing...', ru: 'Напишите вопрос...', en: 'Type your question...' },
  aiWelcome: { uz: 'Salom! Men sizning AI sayohat yordamchingizman. Qayerga bormoqchisiz?', ru: 'Привет! Я ваш AI travel-помощник. Куда хотите поехать?', en: 'Hi! I\'m your AI travel assistant. Where would you like to go?' },

  // Tour Types
  tourTypesTitle: { uz: 'Tur Turlari', ru: 'Виды туров', en: 'Tour Types' },
  studentTour: { uz: 'Talaba turi', ru: 'Студенческий тур', en: 'Student Tour' },
  pupilTour: { uz: "O'quvchi turi", ru: 'Школьный тур', en: 'School Tour' },
  familyTour: { uz: 'Oilaviy tur', ru: 'Семейный тур', en: 'Family Tour' },
  corporateTour: { uz: 'Korporativ tur', ru: 'Корпоративный тур', en: 'Corporate Tour' },
  premiumTour: { uz: 'Premium tur', ru: 'Премиум тур', en: 'Premium Tour' },

  // Booking
  bookingTitle: { uz: 'Bron qilish', ru: 'Бронирование', en: 'Booking' },
  selectService: { uz: 'Xizmat tanlash', ru: 'Выбор услуги', en: 'Select Service' },
  selectDate: { uz: 'Sana tanlash', ru: 'Выбор даты', en: 'Select Date' },
  selectGuide: { uz: 'Gid tanlash', ru: 'Выбор гида', en: 'Select Guide' },
  participants: { uz: 'Ishtirokchilar', ru: 'Участники', en: 'Participants' },
  confirm: { uz: 'Tasdiqlash', ru: 'Подтвердить', en: 'Confirm' },
  back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
  next: { uz: 'Keyingi', ru: 'Далее', en: 'Next' },
  pay: { uz: "To'lash", ru: 'Оплатить', en: 'Pay' },

  // Auth
  regTitle: { uz: "Platformaga ro'yxatdan o'ting", ru: 'Зарегистрируйтесь', en: 'Join the Platform' },
  selectRole: { uz: 'Rolingizni tanlang', ru: 'Выберите роль', en: 'Select Role' },
  tourist: { uz: 'Sayyoh', ru: 'Турист', en: 'Tourist' },
  local: { uz: 'Mahalliy aholi', ru: 'Местный житель', en: 'Local Resident' },
  student: { uz: 'Talaba', ru: 'Студент', en: 'Student' },
  business: { uz: 'Biznes', ru: 'Бизнес', en: 'Business' },
  fullName: { uz: 'Ism va familiya', ru: 'Имя и фамилия', en: 'Full Name' },
  email: { uz: 'Email', ru: 'Email', en: 'Email' },
  phone: { uz: 'Telefon', ru: 'Телефон', en: 'Phone' },
  password: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
  otpVerify: { uz: 'SMS tasdiqlash', ru: 'SMS подтверждение', en: 'SMS Verify' },
  googleLogin: { uz: 'Google orqali', ru: 'Через Google', en: 'Via Google' },
  telegramLogin: { uz: 'Telegram orqali', ru: 'Через Telegram', en: 'Via Telegram' },
  submit: { uz: "Ro'yxatdan o'tish", ru: 'Регистрация', en: 'Register' },
  success: { uz: "Tabriklaymiz!", ru: 'Поздравляем!', en: 'Congratulations!' },

  // Dashboard
  dashboardTitle: { uz: 'Kabinet', ru: 'Кабинет', en: 'Dashboard' },
  upcomingTrips: { uz: 'Kelgusi sayohatlar', ru: 'Предстоящие поездки', en: 'Upcoming Trips' },
  myBookings: { uz: 'Bronlarim', ru: 'Мои брони', en: 'My Bookings' },
  confirmed: { uz: 'Tasdiqlangan', ru: 'Подтверждено', en: 'Confirmed' },
  pending: { uz: 'Kutilmoqda', ru: 'Ожидается', en: 'Pending' },

  // Admin
  adminTitle: { uz: 'Admin panel', ru: 'Админ панель', en: 'Admin Panel' },
  users: { uz: 'Foydalanuvchilar', ru: 'Пользователи', en: 'Users' },
  bookings: { uz: 'Bronlar', ru: 'Брони', en: 'Bookings' },
  payments: { uz: "To'lovlar", ru: 'Платежи', en: 'Payments' },
  tourFirms: { uz: 'Tur firmalar', ru: 'Турфирмы', en: 'Tour Companies' },
  hotels: { uz: 'Mehmonxonalar', ru: 'Отели', en: 'Hotels' },
  analytics: { uz: 'Analitika', ru: 'Аналитика', en: 'Analytics' },

  // Footer
  footerDesc: { uz: "O'zbekistonning eng yaxshi all-in-one turizm platformasi", ru: 'Лучшая all-in-one туристическая платформа Узбекистана', en: "Uzbekistan's best all-in-one tourism platform" },
  quickLinks: { uz: 'Tez havolalar', ru: 'Быстрые ссылки', en: 'Quick Links' },
  about: { uz: 'Biz haqimizda', ru: 'О нас', en: 'About' },
  contact: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
  privacy: { uz: 'Maxfiylik', ru: 'Конфиденциальность', en: 'Privacy' },
  allRights: { uz: 'Barcha huquqlar himoyalangan', ru: 'Все права защищены', en: 'All rights reserved' },

  // Common
  send: { uz: 'Yuborish', ru: 'Отправить', en: 'Send' },
  close: { uz: 'Yopish', ru: 'Закрыть', en: 'Close' },
  learnMore: { uz: "Batafsil", ru: 'Подробнее', en: 'Learn More' },
  welcome: { uz: 'Xush kelibsiz', ru: 'Добро пожаловать', en: 'Welcome' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'uz',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('uz');

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
