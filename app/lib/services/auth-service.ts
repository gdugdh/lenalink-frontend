/**
 * Service for user authentication
 * Contains login, registration and session refresh logic
 */

import { backendApi, type BackendUser } from '../backend-api';
import type { UserRole } from '../mockUsers';
import type { Session } from '../types/auth.types';

// Transform BackendUser to our Session format
export function backendUserToSession(backendUser: BackendUser, token: string): Session {
  // Log for debugging
  console.log('backendUserToSession called with:', { backendUser, token });

  // Validate inputs
  if (!backendUser) {
    console.error('backendUser is undefined or null');
    throw new Error('Не удалось получить данные пользователя от сервера');
  }

  if (!token) {
    console.error('token is undefined or null');
    throw new Error('Не удалось получить токен от сервера');
  }

  // Save token to localStorage and backendApi
  if (typeof window !== 'undefined') {
    localStorage.setItem('backend_token', token);
    backendApi.setToken(token);
  }

  // Default role is 'user' since backend doesn't return role
  // In the future, we can add role field to backend or get it from token
  return {
    user: {
      id: backendUser.id,
      email: backendUser.email,
      role: 'user' as UserRole, // Default user
      name: backendUser.name,
      balance: 0,
    },
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
}

export async function refreshUserSession(token: string): Promise<Session | null> {
  try {
    if (!token) {
      return null;
    }

    // If this is a mock token, check session via API route
    if (token === 'mock-token') {
      try {
        const response = await fetch('/api/auth/session', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const sessionData = await response.json();
          // getSession() returns Session directly
          if (sessionData && sessionData.user) {
            const session: Session = {
              user: {
                id: sessionData.user.id,
                email: sessionData.user.email,
                role: sessionData.user.role,
                name: sessionData.user.name,
                balance: sessionData.user.balance,
                companyId: sessionData.user.companyId,
                companyName: sessionData.user.companyName,
                companyBalance: sessionData.user.companyBalance,
              },
              expiresAt: sessionData.expiresAt,
            };
            return session;
          } else {
            // Session expired
            backendApi.setToken(null);
            return null;
          }
        } else {
          // Session not found
          backendApi.setToken(null);
          return null;
        }
      } catch (error) {
        // Error checking session
        backendApi.setToken(null);
        return null;
      }
    } else {
      // Check real token by trying to get bookings list
      // If token is valid, user is authorized
      try {
        await backendApi.getMyBookings();
        // If request succeeds, token is valid
        // But we need to get user data
        // For now return null since we don't have user data
        // In the future, we can add /api/me endpoint to get current user
        return null;
      } catch (error) {
        // Token is invalid
        backendApi.setToken(null);
        return null;
      }
    }
  } catch (error) {
    return null;
  }
}

export async function loginUser(email: string, password: string): Promise<Session> {
  console.log('loginUser called with:', { email });
  const response = await backendApi.login({ email, password });
  console.log('backendApi.login response:', response);

  if (!response) {
    throw new Error('Сервер не вернул ответ');
  }

  if (!response.user) {
    console.error('Response does not contain user:', response);
    throw new Error('Сервер не вернул данные пользователя');
  }

  if (!response.token) {
    console.error('Response does not contain token:', response);
    throw new Error('Сервер не вернул токен авторизации');
  }

  return backendUserToSession(response.user, response.token);
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: UserRole
): Promise<Session> {
  console.log('registerUser called with:', { email, name, role });
  // Backend doesn't accept role during registration, only name, email, password
  const response = await backendApi.register({ name, email, password });
  console.log('backendApi.register response:', response);

  if (!response) {
    throw new Error('Сервер не вернул ответ');
  }

  if (!response.user) {
    console.error('Response does not contain user:', response);
    throw new Error('Сервер не вернул данные пользователя');
  }

  if (!response.token) {
    console.error('Response does not contain token:', response);
    throw new Error('Сервер не вернул токен авторизации');
  }

  return backendUserToSession(response.user, response.token);
}

