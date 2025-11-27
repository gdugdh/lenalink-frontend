import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

  // Validate role parameter independently of user authentication
  // This ensures invalid roles show 404 regardless of auth status
  const validRoles: UserRole[] = ['user', 'admin', 'partner'];
  if (!validRoles.includes(role as UserRole)) {
    notFound();
  }

  // Server-side role check - ensure user has access to this dashboard
  const session = await requireRole(role as UserRole);

  return <DashboardClient />;
}
