"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { LoginModal } from "@/app/components/auth/login-modal";
import { RegisterModal } from "@/app/components/auth/register-modal";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/use-toast";
import { HeaderLogo } from "./HeaderLogo";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenuSheet } from "./MobileMenuSheet";

export function UnifiedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const { session, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    setLoginModalOpen(true);
  };

  return (
    <>
      <header className="bg-[#7B91FF]">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 max-w-full">
          <div className="flex items-center justify-between">
            <HeaderLogo />
            <DesktopMenu
              session={session}
              loading={loading}
              onLoginClick={() => setLoginModalOpen(true)}
              onLogout={handleLogout}
              onDashboardClick={(role) => router.push(`/dashboard/${role}`)}
            />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenuSheet
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        session={session}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onDashboardClick={(role) => router.push(`/dashboard/${role}`)}
      />

      {/* Login Modal */}
      <LoginModal 
        open={loginModalOpen} 
        onOpenChange={setLoginModalOpen}
        onSwitchToRegister={() => {
          setLoginModalOpen(false);
          setRegisterModalOpen(true);
        }}
      />
      {/* Register Modal */}
      <RegisterModal 
        open={registerModalOpen} 
        onOpenChange={setRegisterModalOpen}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </>
  );
}
