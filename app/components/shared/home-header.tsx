'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { LogOut, User, Settings } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/app/hooks/use-toast';
import { Skeleton } from '@/app/components/ui/skeleton';
import { LoginModal } from '@/app/components/auth/login-modal';
import { RegisterModal } from '@/app/components/auth/register-modal';

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

  return (
    <header className="relative z-10 px-3 sm:px-6 py-3 sm:py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[#022444] relative">
            <Image 
              src="/logo.png" 
              alt="LenaLink Logo" 
              width={32} 
              height={32} 
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-lg sm:text-2xl font-semibold">LenaLink</span>
        </Link>

        <div className="flex items-center gap-3">
          {loading ? (
            <Skeleton className="h-9 w-20 bg-white/20" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-white text-[#022444] hover:bg-white/90 border border-white/20 h-9 px-3 sm:px-4 select-none"
                >
                  <Avatar className="h-6 w-6 sm:h-7 sm:w-7 mr-2">
                    <AvatarFallback className="bg-[#022444] text-white text-xs">
                      {session.user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium select-none">
                    {session.user.name.split(' ')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push(`/dashboard/${session.user.role}`)}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  Личный кабинет
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                onClick={() => setLoginModalOpen(true)}
                className="bg-white text-[#022444] hover:bg-white/90 h-9 px-4 sm:px-6 text-sm font-medium"
              >
                Войти
              </Button>
              <LoginModal 
                open={loginModalOpen} 
                onOpenChange={(open) => {
                  setLoginModalOpen(open);
                  if (!open) {
                    // Clean URL when closing
                    const url = new URL(window.location.href);
                    url.searchParams.delete('modal');
                    url.searchParams.delete('redirect');
                    router.replace(url.pathname + url.search, { scroll: false });
                  }
                }}
                onSwitchToRegister={() => {
                  setLoginModalOpen(false);
                  setRegisterModalOpen(true);
                }}
              />
              <RegisterModal 
                open={registerModalOpen} 
                onOpenChange={(open) => {
                  setRegisterModalOpen(open);
                  if (!open) {
                    // Clean URL when closing
                    const url = new URL(window.location.href);
                    url.searchParams.delete('modal');
                    router.replace(url.pathname + url.search, { scroll: false });
                  }
                }}
                onSwitchToLogin={() => {
                  setRegisterModalOpen(false);
                  setLoginModalOpen(true);
                }}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
