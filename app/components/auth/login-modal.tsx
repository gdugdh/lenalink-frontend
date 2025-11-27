'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/app/hooks/use-toast';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Separator } from '@/app/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister?: () => void;
}

export function LoginModal({ open, onOpenChange, onSwitchToRegister }: LoginModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, session } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal if user is already logged in
  useEffect(() => {
    if (session && open) {
      onOpenChange(false);
    }
  }, [session, open, onOpenChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      
      // Wait a moment for session state to update, then get role from API
      await new Promise((resolve) => setTimeout(resolve, 200));
      
      // Get session from API to get the correct role
      const sessionResponse = await fetch('/api/auth/session', {
        credentials: 'include',
      });
      
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        
        toast({
          title: 'Успешный вход',
          description: 'Вы успешно вошли в систему',
        });

        // Close modal
        onOpenChange(false);
        
        // Reset form
        setEmail('');
        setPassword('');
        setShowPassword(false);
        
        // Get redirect parameter or default to dashboard
        const redirectTo = searchParams.get('redirect') || `/dashboard/${sessionData.user.role}`;
        router.push(redirectTo);
        router.refresh(); // Refresh to update header
      } else {
        // Handle case when session fetch fails after successful login
        toast({
          title: 'Ошибка получения сессии',
          description: 'Не удалось получить информацию о сессии. Пожалуйста, попробуйте войти снова.',
          variant: 'destructive',
        });
        // Close modal to allow user to retry
        onOpenChange(false);
        // Reset form
        setEmail('');
        setPassword('');
        setShowPassword(false);
      }
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: error instanceof Error ? error.message : 'Неверный email или пароль',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    // Reset form when closing
    if (!newOpen) {
      setEmail('');
      setPassword('');
      setShowPassword(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Вход в систему</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="modal-email">Email</Label>
            <Input
              id="modal-email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-password">Пароль</Label>
            <div className="relative">
              <Input
                id="modal-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isSubmitting}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              или
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            toast({
              title: 'Вход через Telegram',
              description: 'Функция входа через Telegram находится в разработке',
            });
          }}
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.169 1.858-.896 6.728-.896 6.728-.464 2.402-1.687 2.989-1.687 2.989s-1.352.698-2.978-.558c-1.422-1.12-2.277-1.739-3.475-2.788-1.371-1.199-.483-1.858.298-2.93.636-.875 4.244-3.898 4.328-4.236.009-.033.016-.157-.059-.229-.073-.071-.182-.045-.182-.045l-4.469.03s-.335-.012-.462.098c-.124.108-.124.338-.124.338s.498 4.601 1.06 6.528c.149.518.633 1.168 1.186 1.157.598-.011 1.862-1.779 1.862-1.779s.339 4.148.434 5.121c.015.151.052.371.096.371.059 0 .052-.072.096-.371.125-1.065.434-5.121.434-5.121s1.264 1.768 1.862 1.779c.553.011 1.037-.639 1.186-1.157.562-1.927 1.06-6.528 1.06-6.528s0-.23-.124-.338c-.127-.11-.462-.098-.462-.098l-4.469-.03s-.109-.026-.182.045c-.075.072-.068.196-.059.229.084.338 3.692 3.361 4.328 4.236.781 1.072 1.669 1.731.298 2.93-1.198 1.049-2.053 1.668-3.475 2.788-1.626 1.256-2.978.558-2.978.558s-1.223-.587-1.687-2.989c0 0-.727-4.87-.896-6.728-.081-.87.144-1.212.386-1.527.422-.548 1.072-.674 1.072-.674h10.25s.65.126 1.072.674c.242.315.467.657.386 1.527z"/>
          </svg>
          Войти через Telegram
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Нет аккаунта? </span>
          {onSwitchToRegister ? (
            <button
              type="button"
              onClick={() => {
                handleOpenChange(false);
                onSwitchToRegister();
              }}
              className="text-primary hover:underline"
            >
              Зарегистрироваться
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleOpenChange(false);
                onSwitchToRegister?.();
              }}
              className="text-primary hover:underline"
            >
              Зарегистрироваться
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
