'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardSidebar } from '@/app/components/shared/DashboardSidebar';
import { DashboardHeader } from '@/app/components/shared/DashboardHeader';
import { MobileBottomNav } from '@/app/components/shared/MobileBottomNav';
import { Home, Briefcase, Ticket, FileText, User } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { Skeleton } from '@/app/components/ui/skeleton';

const employeeNavItems = [
  { title: 'Главная', href: '/dashboard/employee', icon: <Home className="h-5 w-5" /> },
  { title: 'Командировки', href: '/dashboard/employee/business-trips', icon: <Briefcase className="h-5 w-5" /> },
  { title: 'Билеты', href: '/dashboard/employee/tickets', icon: <Ticket className="h-5 w-5" /> },
  { title: 'Документы', href: '/dashboard/employee/documents', icon: <FileText className="h-5 w-5" /> },
  { title: 'Профиль', href: '/dashboard/employee/profile', icon: <User className="h-5 w-5" /> },
];

export default function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
  const { session, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!session || session.user.role !== 'employee')) {
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

  if (!session || session.user.role !== 'employee') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} onLogout={handleLogout} />
      <div className="flex">
        <DashboardSidebar role="employee" items={employeeNavItems} />
        <main className="flex-1 lg:ml-0 pb-16 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav items={employeeNavItems} />
    </div>
  );
}

