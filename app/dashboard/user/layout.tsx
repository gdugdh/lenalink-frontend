'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardSidebar } from '@/app/components/shared/DashboardSidebar';
import { DashboardHeader } from '@/app/components/shared/DashboardHeader';
import { MobileBottomNav } from '@/app/components/shared/MobileBottomNav';
import { Home, Ticket, User, Bell, HelpCircle } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { Skeleton } from '@/app/components/ui/skeleton';

const userNavItems = [
  { title: 'Главная', href: '/dashboard/user', icon: <Home className="h-5 w-5" /> },
  { title: 'Бронирования', href: '/dashboard/user/bookings', icon: <Ticket className="h-5 w-5" /> },
  { title: 'Профиль', href: '/dashboard/user/profile', icon: <User className="h-5 w-5" /> },
  { title: 'Уведомления', href: '/dashboard/user/notifications', icon: <Bell className="h-5 w-5" /> },
  { title: 'Поддержка', href: '/dashboard/user/support', icon: <HelpCircle className="h-5 w-5" /> },
];

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const { session, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!session || session.user.role !== 'user')) {
      router.push('/?modal=login');
    }
  }, [session, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось выйти из системы',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-16 w-full" />
        <div className="flex">
          <Skeleton className="h-screen w-64" />
          <Skeleton className="flex-1 h-screen" />
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== 'user') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} onLogout={handleLogout} />
      <div className="flex">
        <DashboardSidebar role="user" items={userNavItems} />
        <main className="flex-1 lg:ml-0 pb-16 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav items={userNavItems} />
    </div>
  );
}

