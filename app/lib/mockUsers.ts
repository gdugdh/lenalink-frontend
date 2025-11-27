export type UserRole = 'user' | 'admin' | 'partner';

export interface MockUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  balance?: number; // For user role
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password',
    role: 'user',
    name: 'Иван Иванов',
    balance: 15000,
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
    name: 'Администратор',
  },
  {
    id: '3',
    email: 'partner@example.com',
    password: 'password',
    role: 'partner',
    name: 'Партнёр Компания',
  },
];

