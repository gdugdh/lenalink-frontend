export type UserRole = 'user' | 'employee' | 'accountant' | 'admin';

export interface MockUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  balance?: number; // For user role
  companyId?: string; // For employee and accountant roles
  companyName?: string; // For employee and accountant roles
  companyBalance?: number; // For accountant role
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
    email: 'employee@example.com',
    password: 'password',
    role: 'employee',
    name: 'Сотрудник Компании',
    companyId: 'comp1',
    companyName: 'ООО "Пример"',
  },
  {
    id: '4',
    email: 'accountant@example.com',
    password: 'password',
    role: 'accountant',
    name: 'Бухгалтер Компании',
    companyId: 'comp1',
    companyName: 'ООО "Пример"',
    companyBalance: 500000,
  },
];

