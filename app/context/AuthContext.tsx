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

      // Если это моковый токен, проверяем сессию через API роут
      if (currentToken === 'mock-token') {
        try {
          const response = await fetch('/api/auth/session', {
            credentials: 'include',
          });
          
          if (response.ok) {
            const sessionData = await response.json();
            // getSession() возвращает Session напрямую
            if (sessionData && sessionData.user) {
              const session: Session = {
                user: {
                  id: sessionData.user.id,
                  email: sessionData.user.email,
                  role: sessionData.user.role,
                  name: sessionData.user.name,
                  balance: sessionData.user.balance,
                },
                expiresAt: sessionData.expiresAt,
              };
              setSession(session);
              setToken('mock-token');
            } else {
              // Сессия истекла
              backendApi.setToken(null);
              setSession(null);
              setToken(null);
            }
          } else {
            // Сессия не найдена
            backendApi.setToken(null);
            setSession(null);
            setToken(null);
          }
        } catch (error) {
          // Ошибка при проверке сессии
          backendApi.setToken(null);
          setSession(null);
          setToken(null);
        }
      } else {
        // Проверяем реальный токен, пытаясь получить список бронирований
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
    // Проверяем, нужно ли использовать моковый API
    const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
    
    if (useMockAuth) {
      // Используем моковый API роут для тестирования
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Ошибка входа');
        }

        const data = await response.json();
        
        // Преобразуем мокового пользователя в формат Session
        const session: Session = {
          user: {
            id: data.session.user.id,
            email: data.session.user.email,
            role: data.session.user.role,
            name: data.session.user.name,
            balance: data.session.user.balance,
          },
          expiresAt: data.session.expiresAt,
        };
        
        setSession(session);
        // Для моковых пользователей сохраняем специальный токен
        setToken('mock-token');
        if (typeof window !== 'undefined') {
          localStorage.setItem('backend_token', 'mock-token');
        }
      } catch (error) {
        throw error;
      }
    } else {
      // Используем реальный API с fallback на моковый
      try {
        const response = await backendApi.login({ email, password });
        const session = backendUserToSession(response.user, response.token);
        setSession(session);
        setToken(response.token);
      } catch (error) {
        // Если реальный API не работает, пробуем моковый как fallback
        console.warn('Real API failed, trying mock auth:', error);
        try {
          const mockResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
          });

          if (!mockResponse.ok) {
            const error = await mockResponse.json();
            throw new Error(error.message || 'Ошибка входа');
          }

          const data = await mockResponse.json();
          
          const session: Session = {
            user: {
              id: data.session.user.id,
              email: data.session.user.email,
              role: data.session.user.role,
              name: data.session.user.name,
              balance: data.session.user.balance,
            },
            expiresAt: data.session.expiresAt,
          };
          
          setSession(session);
          setToken('mock-token');
          if (typeof window !== 'undefined') {
            localStorage.setItem('backend_token', 'mock-token');
          }
        } catch (mockError) {
          // Если и моковый не работает, пробрасываем исходную ошибку
          throw error;
        }
      }
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // Проверяем, нужно ли использовать моковый API
    const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
    
    if (useMockAuth) {
      // Используем моковый API роут для тестирования
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name, role }),
          credentials: 'include',
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Ошибка регистрации');
        }

        const data = await response.json();
        
        const session: Session = {
          user: {
            id: data.session.user.id,
            email: data.session.user.email,
            role: data.session.user.role,
            name: data.session.user.name,
            balance: data.session.user.balance,
          },
          expiresAt: data.session.expiresAt,
        };
        
        setSession(session);
        setToken('mock-token');
        if (typeof window !== 'undefined') {
          localStorage.setItem('backend_token', 'mock-token');
        }
      } catch (error) {
        throw error;
      }
    } else {
      // Используем реальный API с fallback на моковый
      try {
        // Бэкенд не принимает role при регистрации, только name, email, password
        const response = await backendApi.register({ name, email, password });
        const session = backendUserToSession(response.user, response.token);
        setSession(session);
        setToken(response.token);
      } catch (error) {
        // Если реальный API не работает, пробуем моковый как fallback
        console.warn('Real API failed, trying mock auth:', error);
        try {
          const mockResponse = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name, role }),
            credentials: 'include',
          });

          if (!mockResponse.ok) {
            const error = await mockResponse.json();
            throw new Error(error.message || 'Ошибка регистрации');
          }

          const data = await mockResponse.json();
          
          const session: Session = {
            user: {
              id: data.session.user.id,
              email: data.session.user.email,
              role: data.session.user.role,
              name: data.session.user.name,
              balance: data.session.user.balance,
            },
            expiresAt: data.session.expiresAt,
          };
          
          setSession(session);
          setToken('mock-token');
          if (typeof window !== 'undefined') {
            localStorage.setItem('backend_token', 'mock-token');
          }
        } catch (mockError) {
          // Если и моковый не работает, пробрасываем исходную ошибку
          throw error;
        }
      }
    }
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

