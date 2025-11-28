'use client';

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
import { Skeleton } from '@/app/components/ui/skeleton';
import { User, LogOut } from 'lucide-react';
import type { Session } from '@/app/lib/types/auth.types';

interface DesktopMenuProps {
  session: Session | null;
  loading: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  onDashboardClick: (role: string) => void;
}

export function DesktopMenu({
  session,
  loading,
  onLoginClick,
  onLogout,
  onDashboardClick,
}: DesktopMenuProps) {
  return (
    <div className="hidden md:flex items-center gap-4 lg:gap-6">
      <button className="text-xs sm:text-sm text-white hover:text-white/80 whitespace-nowrap">
        ENG
      </button>
      <button className="text-xs sm:text-sm text-white hover:text-white/80 whitespace-nowrap">
        Помощь и поддержка
      </button>
      {loading ? (
        <Skeleton className="h-9 w-20 bg-white/20" />
      ) : session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 border border-white/20 h-9 px-3 sm:px-4"
            >
              <Avatar className="h-6 w-6 sm:h-7 sm:w-7 mr-2">
                <AvatarFallback className="bg-white/20 text-white text-xs">
                  {session.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium">
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
              onClick={() => onDashboardClick(session.user.role)}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              Личный кабинет
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={onLoginClick}
          className="flex items-center gap-2 text-xs sm:text-sm text-white hover:text-white/80 whitespace-nowrap"
        >
          Войти
        </button>
      )}
    </div>
  );
}

