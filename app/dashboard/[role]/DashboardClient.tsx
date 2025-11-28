'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';
import { UserDashboard } from './UserDashboard';
import { AdminDashboard } from './AdminDashboard';
import { EmployeeDashboard } from './EmployeeDashboard';
import { AccountantDashboard } from './AccountantDashboard';
import type { UserRole } from '@/app/lib/mockUsers';

export function DashboardClient() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const roleParam = params?.role as string;

  useEffect(() => {
    if (!loading) {
      if (!session) {
        // No session, redirect to home with login modal
        router.push('/?modal=login');
        return;
      }

      // If role in URL doesn't match user's role, redirect to correct dashboard
      if (roleParam !== session.user.role) {
        router.replace(`/dashboard/${session.user.role}`);
        return;
      }

      // Invalid role, redirect to home with login modal
      if (!['user', 'employee', 'accountant', 'admin'].includes(session.user.role)) {
        router.push('/?modal=login');
      }
    }
  }, [session, loading, roleParam, router]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!session) {
    // Show loading state while redirecting
    return (
      <div className="container mx-auto p-4 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Render the appropriate dashboard based on user's role
  switch (session.user.role) {
    case 'user':
      return <UserDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    case 'accountant':
      return <AccountantDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      // Show loading state while redirecting
      return (
        <div className="container mx-auto p-4 space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      );
  }
}
