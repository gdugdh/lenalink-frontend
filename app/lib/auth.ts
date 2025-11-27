import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MOCK_USERS, type MockUser, type UserRole } from './mockUsers';

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

const SESSION_COOKIE_NAME = 'lena-link-session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Mock login function - checks credentials against MOCK_USERS
 * Returns user data if credentials are valid, null otherwise
 */
export async function loginMock(
  email: string,
  password: string
): Promise<MockUser | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return null;
  }

  return user;
}

/**
 * Mock register function - creates a new user
 * In a real app, this would create a user in the database
 */
export async function registerMock(
  email: string,
  password: string,
  name: string,
  role: UserRole
): Promise<MockUser> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  const existingUser = MOCK_USERS.find((u) => u.email === email);
  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }

  // Create new user
  const newUser: MockUser = {
    id: String(MOCK_USERS.length + 1),
    email,
    password,
    name,
    role,
    ...(role === 'user' && { balance: 0 }),
  };

  // In a real app, save to database
  // For mock, we'll add to the array temporarily (not persisted)
  MOCK_USERS.push(newUser);

  return newUser;
}

/**
 * Create a session and set cookie
 */
export async function createSession(user: MockUser): Promise<void> {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + SESSION_DURATION;

  const session: Session = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      balance: user.balance,
    },
    expiresAt,
  };

  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

/**
 * Get current session from cookies (server-side)
 */
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    const session: Session = JSON.parse(sessionCookie.value);

    // Check if session expired
    if (Date.now() > session.expiresAt) {
      return null;
    }

    return session;
  } catch (error) {
    return null;
  }
}

/**
 * Clear session (logout)
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Require authentication - throws redirect if not authenticated
 */
export async function requireAuth(): Promise<Session> {
  const session = await getSession();

  if (!session) {
    redirect('/auth/login');
  }

  return session;
}

/**
 * Require specific role - throws redirect if user doesn't have required role
 */
export async function requireRole(requiredRole: UserRole): Promise<Session> {
  const session = await requireAuth();

  if (session.user.role !== requiredRole) {
    redirect('/auth/login?error=unauthorized');
  }

  return session;
}

/**
 * Client-side helper to get session (makes API call)
 */
export async function getSessionClient(): Promise<Session | null> {
  try {
    const response = await fetch('/api/auth/session', {
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}

