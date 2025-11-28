'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardSidebar } from '@/app/components/shared/DashboardSidebar';
import { DashboardHeader } from '@/app/components/shared/DashboardHeader';
import { MobileBottomNav } from '@/app/components/shared/MobileBottomNav';
import { Home, Building2, Users, FileText, DollarSign, Settings } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { Skeleton } from '@/app/components/ui/skeleton';

const adminNavItems = [
  { title: 'Главная', href: '/dashboard/admin', icon: <Home className="h-5 w-5" /> },
  { title: 'Компании', href: '/dashboard/admin/companies', icon: <Building2 className="h-5 w-5" /> },
  { title: 'Пользователи', href: '/dashboard/admin/users', icon: <Users className="h-5 w-5" /> },
  { title: 'Логи', href: '/dashboard/admin/logs', icon: <FileText className="h-5 w-5" /> },
  { title: 'Тарифы', href: '/dashboard/admin/tariffs', icon: <DollarSign className="h-5 w-5" /> },
  { title: 'Настройки', href: '/dashboard/admin/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { session, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!session || session.user.role !== 'admin')) {
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

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} onLogout={handleLogout} />
      <div className="flex">
        <DashboardSidebar role="admin" items={adminNavItems} />
        <main className="flex-1 lg:ml-0 pb-16 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav items={adminNavItems} />
    </div>
  );
}

