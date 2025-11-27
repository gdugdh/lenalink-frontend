'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { backendApi, type BackendUser } from '../lib/backend-api';
import type { UserRole } from '../lib/mockUsers';

// Адаптируем BackendUser к нашему формату Session
export interface Session {
  user: {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    balance?: number;
  };
  expiresAt: number;
}

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Преобразуем BackendUser в наш формат Session
function backendUserToSession(backendUser: BackendUser, token: string): Session {
  // По умолчанию роль 'user', так как бэкенд не возвращает роль
  // В будущем можно добавить поле role в бэкенд или получать из токена
  return {
    user: {
      id: backendUser.id,
      email: backendUser.email,
      role: 'user' as UserRole, // По умолчанию user
      name: backendUser.name,
    },
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 дней
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const refreshSession = async () => {
    try {
      const currentToken = backendApi.getToken();
      if (!currentToken) {
        setSession(null);
        setToken(null);
        setLoading(false);
        return;
      }

      // Проверяем токен, пытаясь получить список бронирований
      // Если токен валиден, значит пользователь авторизован
      try {
        const { bookings } = await backendApi.getMyBookings();
        // Если запрос успешен, токен валиден
        // Но нам нужно получить данные пользователя
        // Пока используем токен как индикатор авторизации
        // В будущем можно добавить эндпоинт /api/me для получения текущего пользователя
        setToken(currentToken);
        // Сохраняем минимальную сессию на основе токена
        // В реальном приложении нужно добавить эндпоинт для получения данных пользователя
      } catch (error) {
        // Токен невалиден
        backendApi.setToken(null);
        setSession(null);
        setToken(null);
      }
    } catch (error) {
      setSession(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Загружаем токен из localStorage при монтировании
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('backend_token');
      if (savedToken) {
        backendApi.setToken(savedToken);
        setToken(savedToken);
        refreshSession();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await backendApi.login({ email, password });
    const session = backendUserToSession(response.user, response.token);
    setSession(session);
    setToken(response.token);
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // Бэкенд не принимает role при регистрации, только name, email, password
    const response = await backendApi.register({ name, email, password });
    const session = backendUserToSession(response.user, response.token);
    setSession(session);
    setToken(response.token);
  };

  const logout = async () => {
    backendApi.setToken(null);
    setSession(null);
    setToken(null);
  };

  const hasRole = (role: UserRole): boolean => {
    return session?.user.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        login,
        register,
        logout,
        refreshSession,
        hasRole,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

