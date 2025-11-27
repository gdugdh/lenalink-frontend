"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { useAuth } from "@/app/context/AuthContext";
import { LoginModal } from "@/app/components/auth/login-modal";
import { RegisterModal } from "@/app/components/auth/register-modal";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/use-toast";
import { Skeleton } from "@/app/components/ui/skeleton";

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
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-white shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="LenaLink Logo" 
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <span className="text-lg sm:text-xl font-semibold text-white">LenaLink</span>
            </Link>

            {/* Desktop Menu */}
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
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-2 text-xs sm:text-sm text-white hover:text-white/80 whitespace-nowrap"
                >
                  Войти
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-[280px] sm:w-[320px]">
          <SheetHeader>
            <SheetTitle className="text-left">Меню</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
            >
              ENG
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
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
                    setIsMenuOpen(false);
                    router.push(`/dashboard/${session.user.role}`);
                  }}
                  className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Личный кабинет
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-left text-base text-red-600 hover:text-red-700 py-2 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Выйти
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="text-left text-base text-[#022444] hover:text-[#7B91FF] py-2"
              >
                Войти
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>

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
