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
import { LogOut, User } from 'lucide-react';
import type { Session } from '@/app/lib/types/auth.types';

interface UserDropdownProps {
  user: Session['user'];
  onDashboardClick: (role: string) => void;
  onLogout: () => void;
}

export function UserDropdown({ user, onDashboardClick, onLogout }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="bg-white text-[#022444] hover:bg-white/90 border border-white/20 h-9 px-3 sm:px-4 select-none"
        >
          <Avatar className="h-6 w-6 sm:h-7 sm:w-7 mr-2">
            <AvatarFallback className="bg-[#022444] text-white text-xs">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium select-none">
            {user.name.split(' ')[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDashboardClick(user.role)}
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
  );
}

