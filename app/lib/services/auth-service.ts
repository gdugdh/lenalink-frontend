/**
 * Service for user authentication
 * Contains login, registration and session refresh logic
 */

import { backendApi, type BackendUser } from '../backend-api';
import type { UserRole } from '../mockUsers';
import type { Session } from '../types/auth.types';

// Transform BackendUser to our Session format
export function backendUserToSession(backendUser: BackendUser, token: string): Session {
  // Default role is 'user' since backend doesn't return role
  // In the future, we can add role field to backend or get it from token
  return {
    user: {
      id: backendUser.id,
      email: backendUser.email,
      role: 'user' as UserRole, // Default user
      name: backendUser.name,
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
  // Check if we need to use mock API
  const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
  
  if (useMockAuth) {
    // Use mock API route for testing
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
      throw new Error(error.message || 'Login error');
    }

    const data = await response.json();
    
    // Transform mock user to Session format
    const session: Session = {
      user: {
        id: data.session.user.id,
        email: data.session.user.email,
        role: data.session.user.role,
        name: data.session.user.name,
        balance: data.session.user.balance,
        companyId: data.session.user.companyId,
        companyName: data.session.user.companyName,
        companyBalance: data.session.user.companyBalance,
      },
      expiresAt: data.session.expiresAt,
    };
    
    // For mock users, save special token
    if (typeof window !== 'undefined') {
      localStorage.setItem('backend_token', 'mock-token');
    }
    
    return session;
  } else {
    // Use real API with fallback to mock
    try {
      const response = await backendApi.login({ email, password });
      return backendUserToSession(response.user, response.token);
    } catch (error) {
      // If real API doesn't work, try mock as fallback
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
          throw new Error(error.message || 'Login error');
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
        // If mock also doesn't work, rethrow original error
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
  // Check if we need to use mock API
  const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
  
  if (useMockAuth) {
    // Use mock API route for testing
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
      throw new Error(error.message || 'Registration error');
    }

    const data = await response.json();
    
    const session: Session = {
      user: {
        id: data.session.user.id,
        email: data.session.user.email,
        role: data.session.user.role,
        name: data.session.user.name,
        balance: data.session.user.balance,
        companyId: data.session.user.companyId,
        companyName: data.session.user.companyName,
        companyBalance: data.session.user.companyBalance,
      },
      expiresAt: data.session.expiresAt,
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('backend_token', 'mock-token');
    }
    
    return session;
  } else {
    // Use real API with fallback to mock
    try {
      // Backend doesn't accept role during registration, only name, email, password
      const response = await backendApi.register({ name, email, password });
      return backendUserToSession(response.user, response.token);
    } catch (error) {
      // If real API doesn't work, try mock as fallback
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
          throw new Error(error.message || 'Registration error');
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
        // If mock also doesn't work, rethrow original error
        throw error;
      }
    }
  }
}

