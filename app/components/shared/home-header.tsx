'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/app/hooks/use-toast';
import { Skeleton } from '@/app/components/ui/skeleton';
import { HeaderLogo } from './HeaderLogo';
import { UserDropdown } from './UserDropdown';
import { AuthButtons } from './AuthButtons';

export function HomeHeader() {
  const { session, loading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  // Check URL params to open modals
  const modalParam = searchParams.get('modal');
  useEffect(() => {
    if (modalParam === 'login') {
      setLoginModalOpen(true);
    } else if (modalParam === 'register') {
      setRegisterModalOpen(true);
    }
  }, [modalParam]);

  const handleLogout = async () => {
    try {
      // Close modals before logout
      setLoginModalOpen(false);
      setRegisterModalOpen(false);
      
      await logout();
      
      // Navigate to home without any query parameters
      router.replace('/', { scroll: false });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось выйти из системы',
        variant: 'destructive',
      });
    }
  };

  const handleLoginModalChange = (open: boolean) => {
    setLoginModalOpen(open);
    if (!open) {
      const url = new URL(window.location.href);
      url.searchParams.delete('modal');
      url.searchParams.delete('redirect');
      router.replace(url.pathname + url.search, { scroll: false });
    }
  };

  const handleRegisterModalChange = (open: boolean) => {
    setRegisterModalOpen(open);
    if (!open) {
      const url = new URL(window.location.href);
      url.searchParams.delete('modal');
      router.replace(url.pathname + url.search, { scroll: false });
    }
  };

  return (
    <header className="relative z-10 px-3 sm:px-6 py-3 sm:py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center relative">
              <Image 
                src="/logo.svg" 
                alt="LenaLink Logo" 
                width={32} 
                height={32} 
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="text-lg sm:text-2xl font-semibold">LenaLink</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <Skeleton className="h-9 w-20 bg-white/20" />
          ) : session ? (
            <UserDropdown
              user={session.user}
              onDashboardClick={(role) => router.push(`/dashboard/${role}`)}
              onLogout={handleLogout}
            />
          ) : (
            <AuthButtons
              onLoginClick={() => setLoginModalOpen(true)}
              onRegisterClick={() => setRegisterModalOpen(true)}
              loginModalOpen={loginModalOpen}
              registerModalOpen={registerModalOpen}
              onLoginModalChange={handleLoginModalChange}
              onRegisterModalChange={handleRegisterModalChange}
              onSwitchToRegister={() => {
                setLoginModalOpen(false);
                setRegisterModalOpen(true);
              }}
              onSwitchToLogin={() => {
                setRegisterModalOpen(false);
                setLoginModalOpen(true);
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
