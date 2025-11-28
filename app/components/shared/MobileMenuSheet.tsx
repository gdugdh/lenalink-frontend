'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/components/ui/sheet';
import { User, LogOut } from 'lucide-react';
import type { Session } from '@/app/lib/types/auth.types';

interface MobileMenuSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onDashboardClick: (role: string) => void;
}

export function MobileMenuSheet({
  isOpen,
  onOpenChange,
  session,
  onLoginClick,
  onLogout,
  onDashboardClick,
}: MobileMenuSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="text-left">Меню</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={() => onOpenChange(false)}
            className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
          >
            ENG
          </button>
          <button
            onClick={() => onOpenChange(false)}
            className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
          >
            Помощь и поддержка
          </button>
          {session ? (
            <>
              <div className="py-2 border-b">
                <p className="text-sm font-medium text-[#022444]">{session.user.name}</p>
                <p className="text-xs text-muted-foreground">{session.user.email}</p>
              </div>
              <button
                onClick={() => {
                  onOpenChange(false);
                  onDashboardClick(session.user.role);
                }}
                className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2 flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Личный кабинет
              </button>
              <button
                onClick={() => {
                  onOpenChange(false);
                  onLogout();
                }}
                className="text-left text-base text-red-600 hover:text-red-700 py-2 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
            >
              Войти
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

