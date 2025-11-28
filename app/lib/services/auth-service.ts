/**
 * Сервис для работы с аутентификацией пользователей
 * Содержит логику входа, регистрации и обновления сессии
 */

import { backendApi, type BackendUser } from '../backend-api';
import type { UserRole } from '../mockUsers';
import type { Session } from '../types/auth.types';

// Преобразуем BackendUser в наш формат Session
export function backendUserToSession(backendUser: BackendUser, token: string): Session {
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

export async function refreshUserSession(token: string): Promise<Session | null> {
  try {
    if (!token) {
      return null;
    }

    // Если это моковый токен, проверяем сессию через API роут
    if (token === 'mock-token') {
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
            return session;
          } else {
            // Сессия истекла
            backendApi.setToken(null);
            return null;
          }
        } else {
          // Сессия не найдена
          backendApi.setToken(null);
          return null;
        }
      } catch (error) {
        // Ошибка при проверке сессии
        backendApi.setToken(null);
        return null;
      }
    } else {
      // Проверяем реальный токен, пытаясь получить список бронирований
      // Если токен валиден, значит пользователь авторизован
      try {
        await backendApi.getMyBookings();
        // Если запрос успешен, токен валиден
        // Но нам нужно получить данные пользователя
        // Пока возвращаем null, так как нет данных пользователя
        // В будущем можно добавить эндпоинт /api/me для получения текущего пользователя
        return null;
      } catch (error) {
        // Токен невалиден
        backendApi.setToken(null);
        return null;
      }
    }
  } catch (error) {
    return null;
  }
}

export async function loginUser(email: string, password: string): Promise<Session> {
  // Проверяем, нужно ли использовать моковый API
  const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
  
  if (useMockAuth) {
    // Используем моковый API роут для тестирования
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
    
    // Для моковых пользователей сохраняем специальный токен
    if (typeof window !== 'undefined') {
      localStorage.setItem('backend_token', 'mock-token');
    }
    
    return session;
  } else {
    // Используем реальный API с fallback на моковый
    try {
      const response = await backendApi.login({ email, password });
      return backendUserToSession(response.user, response.token);
    } catch (error) {
      // Если реальный API не работает, пробуем моковый как fallback
      if (process.env.NODE_ENV === 'development') {
        console.warn('Real API failed, trying mock auth:', error);
      }
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
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('backend_token', 'mock-token');
        }
        
        return session;
      } catch (mockError) {
        // Если и моковый не работает, пробрасываем исходную ошибку
        throw error;
      }
    }
  }
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: UserRole
): Promise<Session> {
  // Проверяем, нужно ли использовать моковый API
  const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
  
  if (useMockAuth) {
    // Используем моковый API роут для тестирования
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
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('backend_token', 'mock-token');
    }
    
    return session;
  } else {
    // Используем реальный API с fallback на моковый
    try {
      // Бэкенд не принимает role при регистрации, только name, email, password
      const response = await backendApi.register({ name, email, password });
      return backendUserToSession(response.user, response.token);
    } catch (error) {
      // Если реальный API не работает, пробуем моковый как fallback
      if (process.env.NODE_ENV === 'development') {
        console.warn('Real API failed, trying mock auth:', error);
      }
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
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('backend_token', 'mock-token');
        }
        
        return session;
      } catch (mockError) {
        // Если и моковый не работает, пробрасываем исходную ошибку
        throw error;
      }
    }
  }
}

