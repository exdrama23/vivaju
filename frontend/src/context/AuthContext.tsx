/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import type { Usuario, ProdutoLoja, Categoria } from '@/types';
import { apiRequest } from '@/services/api';

interface AuthContextType {
  user: Usuario | null;
  login: (user: Usuario) => void;
  logout: () => Promise<void>;
  register: (user: Usuario) => void;
  adicionarProduto: (produto: Omit<ProdutoLoja, 'id'>) => void;
  adicionarCategoria: (categoria: Omit<Categoria, 'id'>) => void;
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

  const logout = async () => {
    try {
      await apiRequest('/logout', { method: 'POST' });
    } catch (err) {
      console.error('Erro ao fazer logout no servidor:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('vivaju_user');
    }
  };

  const register = (userData: Usuario) => {
    const users = JSON.parse(localStorage.getItem('vivaju_users') || '[]');
    const newUsers = [...users, userData];
    localStorage.setItem('vivaju_users', JSON.stringify(newUsers));
    login(userData);
  };

  const adicionarProduto = (produtoDto: Omit<ProdutoLoja, 'id'>) => {
    if (!user) return;
    const novoProduto = { ...produtoDto, id: Date.now().toString() };
    const updatedUser = {
      ...user,
      produtos: [...(user.produtos || []), novoProduto]
    };
    login(updatedUser);
  };

  const adicionarCategoria = (categoriaDto: Omit<Categoria, 'id'>) => {
    if (!user) return;
    const novaCategoria = { ...categoriaDto, id: Date.now().toString() };
    const updatedUser = {
      ...user,
      categorias: [...(user.categorias || []), novaCategoria]
    };
    login(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, adicionarProduto, adicionarCategoria }}>
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