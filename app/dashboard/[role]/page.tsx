import type { Metadata } from 'next';
import { DashboardClient } from './DashboardClient';
import { requireRole } from '@/app/lib/auth';
import type { UserRole } from '@/app/lib/mockUsers';

type Props = {
  params: Promise<{ role: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const roleNames: Record<string, string> = {
    user: 'Пользователь',
    admin: 'Администратор',
    partner: 'Партнёр',
  };

  return {
    title: `Личный кабинет - ${roleNames[role] || 'Dashboard'} | LenaLink`,
    description: `Личный кабинет ${roleNames[role] || 'пользователя'}`,
  };
}

export default async function DashboardPage({ params }: Props) {
  const { role } = await params;

  // Validate role parameter
  const validRoles: UserRole[] = ['user', 'admin', 'partner'];
  if (!validRoles.includes(role as UserRole)) {
    // This will redirect to login if role is invalid
    await requireRole('user');
  }

  // Server-side role check - ensure user has access to this dashboard
  const session = await requireRole(role as UserRole);

  return <DashboardClient />;
}
