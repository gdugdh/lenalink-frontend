/**
 * Типы для аутентификации
 */

import type { UserRole } from '../mockUsers';

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

export interface AuthContextType {
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  token: string | null;
}

