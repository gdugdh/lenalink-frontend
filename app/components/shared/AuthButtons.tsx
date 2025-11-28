'use client';

import { Button } from '@/app/components/ui/button';
import { LoginModal } from '@/app/components/auth/login-modal';
import { RegisterModal } from '@/app/components/auth/register-modal';

interface AuthButtonsProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  onLoginModalChange: (open: boolean) => void;
  onRegisterModalChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

export function AuthButtons({
  onLoginClick,
  onRegisterClick,
  loginModalOpen,
  registerModalOpen,
  onLoginModalChange,
  onRegisterModalChange,
  onSwitchToRegister,
  onSwitchToLogin,
}: AuthButtonsProps) {
  return (
    <>
      <Button
        onClick={onLoginClick}
        className="bg-white text-[#022444] hover:bg-white/90 h-9 px-4 sm:px-6 text-sm font-medium"
      >
        Войти
      </Button>
      <LoginModal 
        open={loginModalOpen} 
        onOpenChange={onLoginModalChange}
        onSwitchToRegister={onSwitchToRegister}
      />
      <RegisterModal 
        open={registerModalOpen} 
        onOpenChange={onRegisterModalChange}
        onSwitchToLogin={onSwitchToLogin}
      />
    </>
  );
}

