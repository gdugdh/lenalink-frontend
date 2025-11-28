'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { backendApi } from '../lib/backend-api';
import type { UserRole } from '../lib/mockUsers';
import type { Session, AuthContextType } from '../lib/types/auth.types';
import { loginUser, registerUser, refreshUserSession } from '../lib/services/auth-service';

// Экспортируем Session для использования в других файлах
export type { Session } from '../lib/types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const currentToken = backendApi.getToken();
      if (!currentToken) {
        setSession(null);
        setToken(null);
        setLoading(false);
        return;
      }

      const session = await refreshUserSession(currentToken);
      if (session) {
              setSession(session);
        setToken(currentToken === 'mock-token' ? 'mock-token' : currentToken);
      } else {
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
  }, []);

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
  }, [refreshSession]);

  const login = useCallback(async (email: string, password: string) => {
    const session = await loginUser(email, password);
    setSession(session);
    const token = backendApi.getToken();
    setToken(token);
    return session;
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, role: UserRole) => {
    const session = await registerUser(email, password, name, role);
    setSession(session);
    const token = backendApi.getToken();
    setToken(token);
    return session;
  }, []);

  const logout = useCallback(async () => {
    backendApi.setToken(null);
    setSession(null);
    setToken(null);
  }, []);

  const hasRole = useCallback((role: UserRole): boolean => {
    return session?.user.role === role;
  }, [session]);

  const value = useMemo(() => ({
        session,
        loading,
        login,
        register,
        logout,
        refreshSession,
        hasRole,
        token,
  }), [session, loading, login, register, logout, refreshSession, hasRole, token]);

  return (
    <AuthContext.Provider value={value}>
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

