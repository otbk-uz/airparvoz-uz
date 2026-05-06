import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'tourist' | 'local' | 'student' | 'business' | null;
export type Page = 'home' | 'register' | 'dashboard' | 'admin';

interface User {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

interface Booking {
  id: string;
  type: string;
  destination: string;
  date: string;
  participants: number;
  guide?: string;
  status: 'confirmed' | 'pending';
  price?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  isLoggedIn: boolean;
  logout: () => void;
  showBooking: boolean;
  setShowBooking: (show: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdmin: boolean;
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  currentPage: 'home',
  setCurrentPage: () => {},
  selectedRole: null,
  setSelectedRole: () => {},
  bookings: [],
  addBooking: () => {},
  isLoggedIn: false,
  logout: () => {},
  showBooking: false,
  setShowBooking: () => {},
  activeSection: 'home',
  setActiveSection: () => {},
  isAdmin: false,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [bookings, setBookings] = useState<Booking[]>([
    { id: '1', type: 'Oilaviy tur', destination: 'Samarqand', date: '2026-06-15', participants: 4, guide: 'Azizbek', status: 'confirmed', price: '$499' },
    { id: '2', type: 'Ekzotik tur', destination: 'Xiva', date: '2026-07-20', participants: 2, guide: 'Gulnora', status: 'pending', price: '$699' },
  ]);
  const [showBooking, setShowBooking] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'business';

  const addBooking = useCallback((booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentPage('home');
    setActiveSection('home');
  }, []);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      currentPage,
      setCurrentPage,
      selectedRole,
      setSelectedRole,
      bookings,
      addBooking,
      isLoggedIn,
      logout,
      showBooking,
      setShowBooking,
      activeSection,
      setActiveSection,
      isAdmin,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
