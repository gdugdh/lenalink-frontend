'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardSidebar } from '@/app/components/shared/DashboardSidebar';
import { DashboardHeader } from '@/app/components/shared/DashboardHeader';
import { MobileBottomNav } from '@/app/components/shared/MobileBottomNav';
import { Home, Calculator, TrendingUp, Users, FileText, Settings } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { Skeleton } from '@/app/components/ui/skeleton';

const accountantNavItems = [
  { title: 'Главная', href: '/dashboard/accountant', icon: <Home className="h-5 w-5" /> },
  { title: 'Баланс', href: '/dashboard/accountant/balance', icon: <Calculator className="h-5 w-5" /> },
  { title: 'Транзакции', href: '/dashboard/accountant/transactions', icon: <TrendingUp className="h-5 w-5" /> },
  { title: 'Сотрудники', href: '/dashboard/accountant/employees', icon: <Users className="h-5 w-5" /> },
  { title: 'Отчеты', href: '/dashboard/accountant/reports', icon: <FileText className="h-5 w-5" /> },
  { title: 'Настройки', href: '/dashboard/accountant/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function AccountantDashboardLayout({ children }: { children: React.ReactNode }) {
  const { session, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!session || session.user.role !== 'accountant')) {
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

  if (!session || session.user.role !== 'accountant') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} onLogout={handleLogout} />
      <div className="flex">
        <DashboardSidebar role="accountant" items={accountantNavItems} />
        <main className="flex-1 lg:ml-0 pb-16 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav items={accountantNavItems} />
    </div>
  );
}

