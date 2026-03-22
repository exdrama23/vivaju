/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import type { Usuario } from '@/types';

interface AuthContextType {
  user: Usuario | null;
  login: (user: Usuario) => void;
  logout: () => void;
  register: (user: Usuario) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem('vivaju_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: Usuario) => {
    setUser(userData);
    localStorage.setItem('vivaju_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vivaju_user');
  };

  const register = (userData: Usuario) => {
    const users = JSON.parse(localStorage.getItem('vivaju_users') || '[]');
    const newUsers = [...users, userData];
    localStorage.setItem('vivaju_users', JSON.stringify(newUsers));
    login(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};